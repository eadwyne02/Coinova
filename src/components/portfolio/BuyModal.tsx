import { useState } from 'react'
import { usePortfolio } from '../../hooks/usePortfolio'

interface Props {
  coin: {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
  }
  onClose: () => void
}

export default function BuyModal({ coin, onClose }: Props) {
  const [amount, setAmount] = useState('')
  const { buy } = usePortfolio()

  const total = parseFloat(amount || '0') * coin.current_price

  const handleBuy = () => {
    if (!amount || parseFloat(amount) <= 0) return

    buy({
      coinId: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      amount: parseFloat(amount),
      buyPrice: coin.current_price,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full bg-[#181e27] rounded-t-3xl px-6 py-6 z-10">
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
        <div className="flex items-center gap-3 mb-6">
          <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-white font-semibold">{coin.name}</p>
            <p className="text-white/45 text-xs">
              1 {coin.symbol.toUpperCase()} = ${coin.current_price.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-[#23282e] rounded-2xl px-4 py-3 mb-3">
          <p className="text-white/40 text-xs mb-1">Amount ({coin.symbol.toUpperCase()})</p>
          <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-transparent text-white text-xl font-semibold outline-none placeholder:text-white/20"/>
        </div>
        <div className="flex justify-between items-center px-1 mb-6">
          <p className="text-white/40 text-sm">Total</p>
          <p className="text-white font-semibold">
            ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <button onClick={handleBuy} className="w-full bg-[#1a6ee8] text-white font-semibold py-4 rounded-2xl active:opacity-80">
          Buy {coin.symbol.toUpperCase()}
        </button>
      </div>
    </div>
  )
}