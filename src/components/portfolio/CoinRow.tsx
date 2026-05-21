import { useState } from 'react'
import MiniChart from './MiniChart'
import BuyModal from './BuyModal'

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] }
}

export default function CoinRow({ coin }: { coin: Coin }) {
  const isPositive = coin.price_change_percentage_24h >= 0
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className="flex items-center justify-between py-3.5 border-b border-white/[0.06] last:border-none cursor-pointer"
        // onClick={() => setShowModal(true)} 
      >
        <div className="flex items-center gap-2.5 min-w-[110px]">
          <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              {coin.symbol.toUpperCase()}
            </p>
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

      {/* buy modal */}
      {showModal && (
        <BuyModal coin={coin} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}