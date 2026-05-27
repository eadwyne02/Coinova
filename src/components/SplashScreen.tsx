import { useEffect } from 'react'
import logo from '../assets/coinova-logo.webp'

interface Props {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0e1a] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#6b5cf7] rounded-full blur-[100px] opacity-15 animate-pulse" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-[#0d82ec] rounded-full blur-[100px] opacity-12 animate-pulse" />
      <div className="relative z-10 flex flex-col items-center gap-5 animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <img src={logo} alt="Coinova"className="w-20 h-20 rounded-[22px] animate-[logoScale_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.2s_both]"/>
        <div className="flex text-[28px] font-extrabold tracking-[3px] font-jakarta">
          <span className="text-white">COIN</span>
          <span className="bg-gradient-to-b from-[#8f37f7] via-[#6b5cf7] to-[#0d82ec] bg-clip-text text-transparent">
            OVA
          </span>
        </div>
        <p className="text-[13px] text-white/35 tracking-widest">
          Your crypto portfolio, simplified
        </p>
      </div>
      <div className="absolute bottom-16 z-10 flex flex-col items-center gap-3">
        <div className="w-36 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#8f37f7] to-[#0d82ec] rounded-full animate-[loadBar_2.5s_ease_forwards]" />
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/25 animate-[dotPulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }}/>
          ))}
        </div>
      </div>
    </div>
  )
}