import { useCoinList } from '../hooks/useCoinList'
import CoinRow from '../components/portfolio/CoinRow'

export default function PortfolioPage() {
  const { coins, loading } = useCoinList(3)

  return (
    <div className="px-4 py-6"> 
      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
                <div className="h-2.5 w-12 rounded bg-white/5 animate-pulse" />
              </div>
              <div className="h-8 w-16 rounded bg-white/5 animate-pulse" />
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
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </div>
      )}

    </div>
  )
}