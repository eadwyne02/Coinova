import { useCoinList } from '../hooks/useCoinList'
import CoinRow from '../components/portfolio/CoinRow'

export default function PortfolioPage() {
  const { coins, loading } = useCoinList(7)

  return (
    <div className="px-4 py-6">
      {loading && (
        <div className="space-y-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
                <div className="h-2.5 w-12 rounded bg-white/5 animate-pulse" />
              </div>
              {/* Chart skeleton — give it explicit size */}
              <div className="w-20 h-10 rounded bg-white/5 animate-pulse hidden md:block" />
              <div className="space-y-1.5 text-right">
                <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
                <div className="h-2.5 w-10 rounded bg-white/5 animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div>
          {coins.map((coin, index) => (
            <div key={coin.id} className={index >= 3 ? 'hidden md:block' : ''}>
              <CoinRow coin={coin} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}