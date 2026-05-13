import { useState, useMemo } from 'react'
import { useCoinList } from '../hooks/useCoinList'
import MiniChart from '../components/portfolio/MiniChart'

type FilterType = 'all' | 'gainers' | 'losers' | 'top_volume' | 'top_cap'

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All Assets', value: 'all' },
  { label: 'Top Volume', value: 'top_volume' },
  { label: 'Gainers', value: 'gainers' },
  { label: 'Losers', value: 'losers' },
  { label: 'Top Cap', value: 'top_cap' },
]

function MarketOverview() {
  const { coins, loading } = useCoinList()
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filtered = useMemo(() => {
    let result = [...coins]

    switch (activeFilter) {
      case 'gainers':
        result = result
          .filter(c => c.price_change_percentage_24h > 0)
          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        break
      case 'losers':
        result = result
          .filter(c => c.price_change_percentage_24h < 0)
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        break
      case 'top_volume':
        result = result.sort((a, b) => b.total_volume - a.total_volume)
        break
      case 'top_cap':
        result = result.sort((a, b) => b.market_cap - a.market_cap)
        break
      default:
        break
    }

    const q = query.toLowerCase().trim()
    if (q) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
      )
    }

    return result
  }, [query, coins, activeFilter])

  if (loading) return <div>Loading...</div>

  return (
    <div className="">
      <div className='fixed top-0 right-0 left-0 bg-[#23282e] px-4 pt-4 pb-2'>
        <p className='font-bold text-white font-jakarta text-2xl pb-5'>Market Overview</p>
        <div className="relative mb-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a8c91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search Cryptocurrencies" value={query} onChange={e => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-[#151923] text-white placeholder-white/60 outline-none focus:ring-1 focus:ring-white/20 text-sm"/>
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className='bg-[#141720] min-h-screen px-4 pt-45'>
        <div className=" bg-[#141720] fixed top-32 right-0 left-0 flex gap-3 overflow-x-auto py-2 pl-4 mb-4 scrollbar-hide shadow-[0_10px_10px_-5px_rgba(255,255,255,0.2)]">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === f.value
                  ? 'bg-[#0189f4] text-white/70'
                  : 'border border-[1px] text-white/60 hover:bg-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-white/40 mt-10 text-sm">No coins found for "{query}"</p>
        ) : (
          filtered.map(coin => {
            const isPositive = coin.price_change_percentage_24h >= 0

            return (
              <div className="flex items-center justify-between pt-3.5 pb-5 border-b border-white/[0.06] last:border-none" key={coin.id}>
                <div className="flex items-center gap-2.5 min-w-[110px]">
                  <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full object-cover"/>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{coin.symbol.toUpperCase()}</p>
                    <p className="text-[11px] text-white/45 mt-0.5">{coin.name}</p>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <MiniChart
                    data={coin.sparkline_in_7d.price}
                    color={isPositive ? '#22c55e' : '#ef4444'}
                  />
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-sm font-semibold text-white leading-tight">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <p className={`text-[11px] font-medium mt-0.5 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(1)}%
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MarketOverview