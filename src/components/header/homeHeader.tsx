import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/coinova-logo.webp'

type TickerCoin = {
  symbol: string
  price: string
  change: number
}

const TICKER_COINS: TickerCoin[] = [
  { symbol: 'BTC',  price: '$68,240', change:  2.4  },
  { symbol: 'ETH',  price: '$3,512',  change: -1.1  },
  { symbol: 'SOL',  price: '$178.4',  change:  4.7  },
  { symbol: 'BNB',  price: '$604.2',  change:  0.9  },
  { symbol: 'AVAX', price: '$39.18',  change:  5.2  },
  { symbol: 'ADA',  price: '$0.461',  change: -2.3  },
  { symbol: 'DOT',  price: '$7.83',   change:  1.6  },
  { symbol: 'MATIC',price: '$0.712',  change: -0.8  },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function Header() {
  const tickerRef = useRef<HTMLDivElement>(null)
  const [hasNotif, setHasNotif] = useState(true)

  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    let frame: number
    let pos = 0
    const speed = 0.5

    const tick = () => {
      pos += speed
      const half = el.scrollWidth / 2
      if (pos >= half) pos = 0
      el.style.transform = `translateX(-${pos}px)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#121621]">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] text-white/40 font-inter font-normal">
            {getGreeting()} 👋
          </span>
          <span className="text-[16px] font-jakarta font-bold text-white leading-tight">
            Anonymous
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setHasNotif(false)}
            className="relative w-[34px] h-[34px] rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center"
            aria-label="Notifications"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {hasNotif && (
              <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-[#6b5cf7] border-[1.5px] border-[#121621]" />
            )}
          </button>

          <div className="flex items-center gap-1.5 bg-[#6b5cf7]/10 border border-[#6b5cf7]/25 rounded-full py-[5px] pl-[5px] pr-[10px]">
            <img
              src={logo}
              alt="Coinova"
              className="w-[22px] h-[22px] rounded-full object-cover"
            />
            <span
              className="text-[12px] font-jakarta font-bold tracking-[1.5px] bg-gradient-to-r from-[#8f37f7] via-[#6b5cf7] to-[#0d82ec] bg-clip-text text-transparent"
            >
              COINOVA
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] overflow-hidden">
        <div className="flex py-[7px]" style={{ width: 'max-content' }} ref={tickerRef}>
          {[...TICKER_COINS, ...TICKER_COINS].map((coin, i) => (
            <div key={i} className="flex items-center gap-1.5 px-4 border-r border-white/[0.06] last:border-none shrink-0">
              <span className="text-[11px] font-medium text-white/45 font-jakarta">
                {coin.symbol}
              </span>
              <span className="text-[11px] font-semibold text-white font-jakarta">
                {coin.price}
              </span>
              <span className={`text-[10px] font-semibold font-jakarta ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Header