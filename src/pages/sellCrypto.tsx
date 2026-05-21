import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useWallet } from "../hooks/useWallet"
import { useCoinList } from "../hooks/useCoinList"
import { usePortfolio } from "../hooks/usePortfolio"
import { sellCoin } from "../store/portfolioStore"

interface Asset {
  coinId: string
  symbol: string
  name: string
  image: string
  amount: number
  value: number
  currentPrice: number
}

const FIAT_CURRENCIES = [
  { code: "NGN", name: "Nigerian Naira",  symbol: "₦",   flag: "🇳🇬", rate: 1620.45 },
  { code: "USD", name: "US Dollar",       symbol: "$",   flag: "🇺🇸", rate: 1       },
  { code: "GBP", name: "British Pound",   symbol: "£",   flag: "🇬🇧", rate: 0.79    },
  { code: "EUR", name: "Euro",            symbol: "€",   flag: "🇪🇺", rate: 0.92    },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪", rate: 129.5   },
  { code: "GHS", name: "Ghanaian Cedi",   symbol: "₵",   flag: "🇬🇭", rate: 15.4    },
]

const PCT_OPTIONS = ["25%", "50%", "75%", "Max"]

export default function SellCrypto() {
  const navigate = useNavigate()
  const { balance } = useWallet()
  const { coins } = useCoinList()
  const { portfolio } = usePortfolio()

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedFiat, setSelectedFiat]   = useState(FIAT_CURRENCIES[0])
  const [coinDropdown, setCoinDropdown]   = useState(false)
  const [fiatDropdown, setFiatDropdown]   = useState(false)
  const [amount, setAmount]               = useState("")
  const [activePct, setActivePct]         = useState("")
  const [success, setSuccess]             = useState(false)

  const ownedAssets: Asset[] = useMemo(() => {
  const usdtLive = coins.find(c => c.id === 'tether')
  const usdtPrice = usdtLive?.current_price ?? 1

  const usdtAsset: Asset = {
    coinId: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    amount: balance,
    value: balance * usdtPrice,
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
        amount: item.amount,
        value: item.amount * currentPrice,
        currentPrice,
      }
    })

  return [usdtAsset, ...coinItems].sort((a, b) => b.value - a.value)
}, [portfolio, coins, balance])

  const sellAmount  = parseFloat(amount || "0")
  const maxAmount   = selectedAsset?.amount ?? 0
  const usdValue    = sellAmount * (selectedAsset?.currentPrice ?? 0)
  const fiatGross   = usdValue * selectedFiat.rate
  const fee         = fiatGross * 0.015
  const youReceive  = fiatGross - fee
  const insufficient = sellAmount > maxAmount + 1e-10

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const applyPct = (pct: string) => {
    if (!selectedAsset) return
    setActivePct(pct)
    const max = selectedAsset.amount
    if (pct === "25%") setAmount(String(max * 0.25))
    else if (pct === "50%") setAmount(String(max * 0.5))
    else if (pct === "75%") setAmount(String(max * 0.75))
    else setAmount(String(max))
  }
  const handleSell = () => {
    if (!selectedAsset || sellAmount <= 0 || insufficient) return
    sellCoin(selectedAsset.coinId, sellAmount)
    setSuccess(true)
    setAmount("")
    setActivePct("")
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#141720] pb-28">
      <div className="bg-[#121621] px-4 pt-4 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-[6px] rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <div>
            <p className="text-white font-jakarta font-bold text-lg leading-tight">Sell Crypto</p>
            <p className="text-white/40 text-[11px] mt-0.5">Cash out to your bank account</p>
          </div>
        </div>
      </div>
      {ownedAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-8 gap-4">
          <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
            </svg>
          </div>
          <p className="text-white/50 text-sm font-medium text-center">No crypto to sell</p>
          <p className="text-white/25 text-xs text-center">Buy some crypto first before you can sell</p>
        </div>
      ) : ( <div className="px-4 pt-5 flex flex-col gap-4">
          <div>
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">Selling</p>
            <div className="relative">
              <button onClick={() => { setCoinDropdown(!coinDropdown); setFiatDropdown(false) }} className="w-full bg-[#1a1f2e] border border-white/[0.08] rounded-2xl px-4 py-3.5 flex items-center justify-between hover:border-white/[0.14] transition-all">
                {selectedAsset ? (
                  <div>
                    <div className="flex items-center gap-3">
                      <img src={selectedAsset.image} alt={selectedAsset.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-white font-semibold text-sm">{selectedAsset.name}</p>
                        <p className="text-white/38 text-[10px] mt-0.5">
                          Balance: {selectedAsset.amount.toFixed(6)} {selectedAsset.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-white/50 text-xs">≈ ${fmt(selectedAsset.value)}</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>
                ) : (<>
                    <p className="text-white/40 text-sm">Select a coin to sell</p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </>
                )}
              </button>

              {coinDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-[#181e2a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-52 overflow-y-auto">
                  {ownedAssets.map((asset, i) => (
                    <button
                      key={asset.coinId}
                      onClick={() => { setSelectedAsset(asset); setCoinDropdown(false); setAmount(""); setActivePct("") }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-all
                        ${i !== ownedAssets.length - 1 ? "border-b border-white/[0.05]" : ""}
                        ${selectedAsset?.coinId === asset.coinId ? "bg-white/[0.03]" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        <div className="text-left">
                          <p className="text-white text-sm font-semibold">{asset.symbol.toUpperCase()}</p>
                          <p className="text-white/38 text-[10px]">{asset.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-xs font-medium">{asset.amount.toFixed(6)}</p>
                        <p className="text-white/30 text-[10px]">${fmt(asset.value)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {selectedAsset && (
            <div>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">Amount</p>
              <div className="bg-[#1a1f2e] border border-white/[0.08] rounded-2xl px-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <input type="number" value={amount} onChange={e => { setAmount(e.target.value); setActivePct("") }} placeholder="0.00"
                    className="bg-transparent text-white text-3xl font-jakarta font-bold outline-none w-full placeholder:text-white/20 tracking-tight"/>
                  <span className="text-white/40 text-sm font-semibold ml-2 flex-shrink-0">
                    {selectedAsset.symbol.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/30 text-[11px]">≈ ${fmt(usdValue)} USD</p>
                <div className="flex gap-2 mt-3">
                  {PCT_OPTIONS.map(pct => (
                    <button key={pct} onClick={() => applyPct(pct)} className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all border ${activePct === pct ? "bg-[#6b5cf7]/18 border-[#6b5cf7]/35 text-[#a89fef]" : "bg-white/[0.04] border-white/[0.07] text-white/40 hover:bg-white/[0.07]"}`} >
                      {pct}
                    </button>
                  ))}
                </div>
              </div>
              {insufficient && (
                <p className="text-red-400 text-xs mt-1.5 px-1">Insufficient balance</p>
              )}
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <div className="w-8 h-8 rounded-full bg-[#1a1f2e] border border-white/[0.08] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </div>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">Receive in</p>
            <div className="relative">
              <button
                onClick={() => { setFiatDropdown(!fiatDropdown); setCoinDropdown(false) }}
                className="w-full bg-[#1a1f2e] border border-white/[0.08] rounded-2xl px-4 py-3.5 flex items-center justify-between hover:border-white/[0.14] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedFiat.flag}</span>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{selectedFiat.name}</p>
                    <p className="text-white/38 text-[10px] mt-0.5">
                      1 USD = {selectedFiat.rate.toLocaleString()} {selectedFiat.code}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {sellAmount > 0 && (
                    <p className="text-green-400 font-jakarta font-bold text-sm">
                      {selectedFiat.symbol}{fmt(youReceive)}
                    </p>
                  )}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </button>

              {fiatDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-[#181e2a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
                  {FIAT_CURRENCIES.map((fiat, i) => (
                    <button
                      key={fiat.code}
                      onClick={() => { setSelectedFiat(fiat); setFiatDropdown(false) }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-all
                        ${i !== FIAT_CURRENCIES.length - 1 ? "border-b border-white/[0.05]" : ""}
                        ${selectedFiat.code === fiat.code ? "bg-white/[0.03]" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{fiat.flag}</span>
                        <div className="text-left">
                          <p className="text-white text-sm font-semibold">{fiat.code}</p>
                          <p className="text-white/38 text-[10px]">{fiat.name}</p>
                        </div>
                      </div>
                      <p className="text-white/40 text-xs">
                        1 USD = {fiat.rate.toLocaleString()} {fiat.code}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {selectedAsset && sellAmount > 0 && (
            <div className="bg-[#1a1f2e] border border-white/[0.06] rounded-2xl px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/38">Exchange rate</span>
                <span className="text-[12px] font-semibold text-white">
                  1 {selectedAsset.symbol.toUpperCase()} = {selectedFiat.symbol}{fmt(selectedAsset.currentPrice * selectedFiat.rate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/38">You're selling</span>
                <span className="text-[12px] font-semibold text-white">
                  {amount} {selectedAsset.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/38">Gross amount</span>
                <span className="text-[12px] font-semibold text-white">{selectedFiat.symbol}{fmt(fiatGross)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/38">Fee (1.5%)</span>
                <span className="text-[12px] font-semibold text-white/40">− {selectedFiat.symbol}{fmt(fee)}</span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/50 font-medium">You receive</span>
                <span className="text-[17px] font-jakarta font-bold text-green-400">
                  {selectedFiat.symbol}{fmt(youReceive)} {selectedFiat.code}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2.5 bg-[#6b5cf7]/[0.07] border border-[#6b5cf7]/[0.18] rounded-xl px-3.5 py-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a89fef" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <rect x="2" y="11" width="20" height="9" rx="1"/>
              <path d="M2 11l10-7 10 7"/>
              <line x1="6" y1="11" x2="6" y2="20"/>
              <line x1="10" y1="11" x2="10" y2="20"/>
              <line x1="14" y1="11" x2="14" y2="20"/>
              <line x1="18" y1="11" x2="18" y2="20"/>
            </svg>
            <p className="text-white/35 text-[11px] leading-relaxed">
              Funds will be sent to your linked bank account within 10–15 mins after the transaction is confirmed.
            </p>
          </div>

          {/* ── sell button ── */}
          <button
            onClick={handleSell}
            disabled={!selectedAsset || sellAmount <= 0 || insufficient}
            className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-[0.99] transition-all text-white font-jakarta font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {success ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Sale Complete!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                {selectedAsset
                  ? `Cash Out ${amount || "0"} ${selectedAsset.symbol.toUpperCase()} → ${selectedFiat.code}`
                  : "Select a coin to sell"}
              </>
            )}
          </button>

        </div>
      )}
    </div>
  )
}