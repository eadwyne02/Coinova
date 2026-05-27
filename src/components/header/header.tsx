import { useState, } from 'react'
import logo from '../../assets/coinova-logo.webp'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [hasNotif, setHasNotif] = useState(true)
  const navigate = useNavigate()
  return (
    <div className=" bg-[#121621]">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Coinova" className="w-[30px] h-[30px] rounded-full object-cover" />
          <span className="font-jakarta font-bold text-[17px] tracking-[2px] leading-none">
            <span className="text-white">COIN</span>
            <span className="bg-gradient-to-b from-[#8f37f7] via-[#6b5cf7] to-[#0d82ec] bg-clip-text text-transparent">OVA</span>
          </span>
        </div>
        <button onClick={() => {setHasNotif(false); navigate("/notification");} } className="relative w-[34px] h-[34px] rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center" aria-label="Notifications">
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

      </div>
    </div>
  )
}

export default Header