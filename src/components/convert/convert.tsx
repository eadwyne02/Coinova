import { useState, useMemo } from "react"
import { useWallet } from "../../hooks/useWallet"
import { useCoinList } from "../../hooks/useCoinList"
import { usePortfolio } from "../../hooks/usePortfolio"
import { buyCoin } from "../../store/portfolioStore"
import { sellCoin } from "../../store/portfolioStore"

interface Asset {
  coinId: string
  symbol: string
  name: string
  image: string
  value: number
  amount: number
  currentPrice: number
}

function CoinDropdown({
  label,
  selected,
  options,
  onSelect,
}: {
  label: string
  selected: Asset | null
  options: Asset[]
  onSelect: (asset: Asset) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <p className="text-sm md:text-[15px] text-[#407fb0] font-medium mb-2">{label}</p>
      <button onClick={() => setOpen(!open)} className="w-full bg-[#1a2240] border border-[#407fb0]/30 rounded-xl px-4 py-3 flex items-center justify-between">
        {selected ? (
          <div className="flex items-center gap-2.5">
            <img src={selected.image} alt={selected.name} className="w-7 h-7 md:w-9 md:h-9 rounded-full" />
            <div className="text-left">
              <p className="text-sm md:text-[15px] font-semibold text-white">{selected.symbol.toUpperCase()}</p>
              <p className="text-[10px] md:text-[13px] text-white/40">{selected.name}</p>
            </div>
          </div>
        ) : (
          <p className="text-white/40 text-sm md:text-[15px]">Select coin</p>
        )}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#9096a0" stroke="none">
          <path d="M6 9l6 6 6-6z" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#181e27] rounded-2xl overflow-hidden shadow-xl border border-white/[0.06] max-h-48 overflow-y-auto">
          {options.map((asset, i) => (
            <button key={asset.coinId} onClick={() => { onSelect(asset); setOpen(false) }} className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-all ${i !== options.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
              <div className="flex items-center gap-2.5">
                <img src={asset.image} alt={asset.name} className="w-7 h-7 md:w-9 md:h-9 rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{asset.symbol.toUpperCase()}</p>
                  <p className="text-[10px] text-white/40">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">
                  {asset.amount.toFixed(asset.coinId === 'tether' ? 2 : 6)}
                </p>
                <p className="text-[10px] text-white/40">
                  ${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ConvertFunds() {
  const { balance } = useWallet()
  const { coins } = useCoinList()
  const { portfolio } = usePortfolio()

  const [fromAsset, setFromAsset] = useState<Asset | null>(null)
  const [toAsset, setToAsset] = useState<Asset | null>(null)
  const [amount, setAmount] = useState('')
  const [success, setSuccess] = useState(false)


  const usdtLive = coins.find(c => c.id === 'tether')
  const usdtPrice = usdtLive?.current_price ?? 1

  const ownedAssets: Asset[] = useMemo(() => {
    const usdt: Asset = {
      coinId: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      value: balance * usdtPrice,
      amount: balance,
      currentPrice: usdtPrice,
    }

    const coinItems = portfolio
      .filter(item => item.coinId !== 'tether')
      .map(item => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        return {
          coinId: item.coinId,
          symbol: item.symbol,
          name: item.name,
          image: item.image,
          value: item.amount * currentPrice,
          amount: item.amount,
          currentPrice,
        }
      })

    return [usdt, ...coinItems].sort((a, b) => b.value - a.value)
  }, [portfolio, coins, balance])
  const allCoins: Asset[] = coins.map(c => ({
    coinId: c.id,
    symbol: c.symbol,
    name: c.name,
    image: c.image,
    value: 0,
    amount: 0,
    currentPrice: c.current_price,
  }))
  const fromAmount = parseFloat(amount || '0')
  const fromValue = fromAmount * (fromAsset?.currentPrice ?? 0) 
  const toAmount = toAsset ? fromValue / toAsset.currentPrice : 0 
  const maxAmount = fromAsset?.amount ?? 0
  const insufficient = fromAmount > maxAmount + 1e-10
  const handleConvert = () => {
    if (!fromAsset || !toAsset || fromAmount <= 0 || insufficient) return
    if (fromAsset.coinId === 'tether') {
      import('../../store/walletStore').then(({ deductBalance }) => {
        deductBalance(fromValue)
      })
    } else {
      sellCoin(fromAsset.coinId, fromAmount)
    }
    if (toAsset.coinId === 'tether') {
      import('../../store/walletStore').then(({ deposit }) => {
        deposit(fromValue)
      })
    } else {
      buyCoin({
        coinId: toAsset.coinId,
        symbol: toAsset.symbol,
        name: toAsset.name,
        image: toAsset.image,
        amount: toAmount,
        buyPrice: toAsset.currentPrice,
      })
    }

    setSuccess(true)
    setAmount('')
    setTimeout(() => setSuccess(false), 3000)
  }
  return (
    <div className="px-4 py-6">
      <div className="bg-[#131a34] border border-[#407fb0]/30 rounded-2xl px-4 py-5 space-y-5">
        <CoinDropdown label="Convert From" selected={fromAsset} options={ownedAssets} onSelect={(a) => { setFromAsset(a); setAmount('') }}/>
        {fromAsset && (
          <div>
            <p className="text-xs text-[#407fb0] md:text-sm font-medium mb-2">Amount</p>
            <div className="bg-[#1a2240] border border-[#407fb0]/20 rounded-xl px-4 py-3">
              <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-transparent text-white text-xl font-semibold outline-none placeholder:text-white/20"/>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[11px] md:text-[13px] text-white/40">
                  ≈ ${fromValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <button onClick={() => setAmount(String(maxAmount))}className="text-[11px] md:text-[13px] text-[#4a9fd4]">
                  Max: {maxAmount.toFixed(fromAsset.coinId === 'tether' ? 2 : 6)} {fromAsset.symbol.toUpperCase()}
                </button>
              </div>
            </div>
            {insufficient && (
              <p className="text-red-400 text-xs mt-1 px-1 md:text-sm">Insufficient balance</p>
            )}
          </div>
        )}
        <div className="flex justify-center">
          <button onClick={() => {
              if (fromAsset && toAsset) {
                const temp = fromAsset
                setFromAsset(toAsset)
                setToAsset(temp)
                setAmount('')
              }
            }}
            className="bg-[#1a2240] border border-[#407fb0]/30 rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#407fb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 4 21 8 17 12" />
              <line x1="3" y1="8" x2="21" y2="8" />
              <polyline points="7 20 3 16 7 12" />
              <line x1="21" y1="16" x2="3" y2="16" />
            </svg>
          </button>
        </div>
        <CoinDropdown label="Convert To" selected={toAsset} options={allCoins.filter(c => c.coinId !== fromAsset?.coinId)} onSelect={setToAsset}/>
        {toAsset && fromAmount > 0 && (
          <div className="bg-[#1a2240] border border-[#407fb0]/20 rounded-xl px-4 py-3">
            <p className="text-xs text-white/40 mb-1">You receive</p>
            <p className="text-white font-semibold text-lg">
              {toAmount.toFixed(6)} {toAsset.symbol.toUpperCase()}
            </p>
            <p className="text-[11px] text-white/40 mt-0.5">
              ≈ ${fromValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        )}

        {/* convert button */}
        <button
          onClick={handleConvert}
          disabled={!fromAsset || !toAsset || fromAmount <= 0 || insufficient}
          className="w-full bg-[#1a6ee8] text-white font-semibold py-4 rounded-2xl active:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {success ? 'Converted!' : `Convert ${fromAsset?.symbol.toUpperCase() ?? ''}`}
        </button>

      </div>
    </div>
  )
}