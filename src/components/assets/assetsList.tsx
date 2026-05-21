import { usePortfolio } from "../../hooks/usePortfolio"
import { useCoinList } from "../../hooks/useCoinList"
import { useWallet } from "../../hooks/useWallet"

export default function AssetsPage() {
  const { portfolio } = usePortfolio()
  const { coins } = useCoinList()
  const { balance } = useWallet()

  const usdtLive = coins.find(c => c.id === 'tether')
  const usdtPrice = usdtLive?.current_price ?? 1
  const usdtValue = balance * usdtPrice 

  const holdings = portfolio
    .filter(item => item.coinId !== 'tether')
    .map(item => {
      const live = coins.find(c => c.id === item.coinId)
      const currentPrice = live?.current_price ?? item.buyPrice
      const currentValue = item.amount * currentPrice
      const costBasis = item.amount * item.buyPrice
      const pnl = currentValue - costBasis
      const pnlPct = (pnl / costBasis) * 100

      return { ...item, currentPrice, currentValue, pnl, pnlPct }
    })

  // const totalValue = holdings.reduce((acc, h) => acc + h.currentValue, 0) + usdtValue

  return (
    <div className="px-4 py-6">
      <h2 className="text-base font-bold text-white font-jakarta mb-1">My Assets</h2>
  
      <div className="flex items-center justify-between py-3.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <img
            src="https://assets.coingecko.com/coins/images/325/small/Tether.png"
            alt="USDT"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-white">USDT</p>
            <p className="text-[11px] text-white/45">{balance.toLocaleString()} USDT</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            ${usdtValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] font-medium mt-0.5 text-white/45">
            ${usdtPrice.toFixed(4)}
          </p>
        </div>
      </div>

      {holdings.map(item => (
        <div key={item.coinId} className="flex items-center justify-between py-3.5 border-b border-white/[0.06] last:border-none">
          <div className="flex items-center gap-2.5">
            <img src={item.image} alt={item.name} className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-white">{item.symbol.toUpperCase()}</p>
              <p className="text-[11px] text-white/45">{item.amount.toFixed(7)} coins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white">
              ${item.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] font-medium mt-0.5 text-white/50">${item.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits:2})} </p>
          </div>
        </div>
      ))}
    </div>
  )
}