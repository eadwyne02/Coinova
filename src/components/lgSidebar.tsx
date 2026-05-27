import { useRef, useState, useEffect } from "react"
import { navItems } from "./navigationItems"
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../assets/coinova-logo.webp"

export default function LgSidebar() {
    const [moreOpen, setMoreOpen] = useState(false)
    const moreRef = useRef<HTMLDivElement>(null)
    function getGreeting() {
        const h = new Date().getHours()
        if (h < 12) return 'Good morning'
        if (h < 17) return 'Good afternoon'
        return 'Good evening'
    }

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const isActive = (path: string) => pathname === path
    
    useEffect(() =>{
        const handler = (e: MouseEvent) =>{
            if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
                setMoreOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="bg-[#0f1724] w-64 h-screen flex flex-col border-r border-white/[0.06]">
            <div className="px-5 pt-8 pb-5">
                <p className="text-white/30 text-xs mb-3">{getGreeting()}</p>
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-full border-2 border-white/10 overflow-hidden bg-[#dadde2]">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-full h-full" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0f1724]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-white/90 font-semibold text-sm tracking-wide truncate">Anonymous A.</p>
                        <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5 w-fit mt-0.5">
                            <svg width="9" height="9" viewBox="0 0 160 185" xmlns="http://www.w3.org/2000/svg">
                                <path d="M80 0 L155 28 L155 100 C155 148 80 185 80 185 C80 185 5 148 5 100 L5 28 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="6"/>
                                <polyline points="45,95 68,120 115,72" fill="none" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-green-400 text-[10px] font-medium">Verified</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-px bg-white/[0.05] mx-5" />
            <div className="flex-1 overflow-y-auto px-3 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[1.5px] text-white/20 px-3 mb-2">Menu</p>
                <div className="flex flex-col gap-0.5">
                    {navItems.map(({ path, label, active, inactive }) => {
                        const active_ = isActive(path)
                        return (
                            <button key={path} onClick={() => navigate(path)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl relative transition-all text-left w-full ${active_ ? 'bg-[#00a9f9]/[0.10]' : 'hover:bg-white/[0.04]'}`}>
                                {active_ && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#00a9f9] rounded-full" />
                                )}
                                <span className="shrink-0">{active_ ? active : inactive}</span>
                                <span className={`text-[13px] font-medium transition-colors ${active_ ? 'text-[#00a9f9]' : 'text-white/40'}`}>
                                    {label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="h-px bg-white/[0.05] mx-5" />
            <div className="px-3 py-4 flex flex-col gap-0.5">
                <p className="text-[9px] font-semibold uppercase tracking-[1.5px] text-white/20 px-3 mb-2">Account</p>
                <button onClick={() => navigate("/setting")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors w-full text-left">
                    <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 100 100" fill="none" stroke="#4485ae" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M49 4 L55 4 L58 16 C62 17 66 19 70 22 L82 17 L87 21 L78 31 C80 35 81 39 81 44 L93 47 L93 53 L81 56 C80 61 78 65 76 69 L85 79 L81 83 L69 74 C65 77 61 79 57 80 L54 92 L48 92 L45 80 C41 79 37 77 33 74 L21 83 L17 79 L26 69 C24 65 22 61 21 56 L9 53 L9 47 L21 44 C21 39 22 35 24 31 L15 21 L20 17 L32 22 C36 19 40 17 44 16 Z"/>
                            <circle cx="51" cy="50" r="16"/>
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-white/75 text-[13px] font-medium">Settings</p>
                        <p className="text-white/30 text-[11px]">Preferences, security</p>
                    </div>
                </button>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors w-full text-left">
                    <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 260 310" fill="none" stroke="#4485ae" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 10 L220 10 C230 10 238 18 238 28 L238 148 C238 158 230 166 220 166 L130 166 L108 194 L86 166 L20 166 C10 166 2 158 2 148 L2 28 C2 18 10 10 20 10 Z"/>
                            <path d="M98 68 C98 52 108 44 120 44 C132 44 142 53 142 64 C142 80 122 83 120 96 L120 106"/>
                            <circle cx="120" cy="122" r="8" fill="#4485ae" stroke="none"/>
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="text-white/75 text-[13px] font-medium">Help Center</p>
                        <p className="text-white/30 text-[11px]">FAQs, support</p>
                    </div>
                </button>
                <div className="relative" ref={moreRef}>
                    <button onClick={() => setMoreOpen(prev => !prev)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4485ae">
                                <circle cx="8" cy="8" r="2"/>
                                <circle cx="16" cy="8" r="2"/>
                                <circle cx="8" cy="16" r="2"/>
                                <circle cx="16" cy="16" r="2"/>
                            </svg>
                        </div>
                        <p className="text-white/75 text-center text-[13px] font-medium">More ...</p>
                    </button>
                    {moreOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#1a1f26] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50">
                            <div className="px-4 py-2.5 border-b border-white/[0.06]">
                                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest">More options</p>
                            </div>
                            <button onClick={() => { navigate(''); setMoreOpen(false) }} className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                        <svg width="16" height="16" viewBox="0 0 170 210" fill="none" stroke="#4485ae" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="85" cy="55" r="32"/>
                                            <path d="M0 210 C0 165 15 138 40 125 C55 118 68 114 85 114 C102 114 115 118 130 125 C155 138 170 165 170 210"/>
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white/85 text-[13px] font-medium">Profile Details</p>
                                        <p className="text-white/30 text-[11px]">Name, phone, address</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span className="text-white/20 text-sm">›</span>
                                </div>
                            </button>
                            <button onClick={() => { navigate(''); setMoreOpen(false) }} className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                        <svg  width="16" height="16" viewBox="0 0 300 260" fill="none" stroke="#4485ae" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0" y="0" width="300" height="200" rx="16"/>
                                            <line x1="0" y1="38" x2="300" y2="38"/>
                                            <circle cx="68" cy="108" r="28"/>
                                            <path d="M28 200 C28 170 44 152 68 145 C92 152 108 170 108 200"/>
                                            <line x1="130" y1="80" x2="264" y2="80"/>
                                            <line x1="130" y1="106" x2="240" y2="106"/>
                                            <line x1="130" y1="132" x2="255" y2="132"/>
                                            <polyline points="155,185 165,195 185,165" stroke="#22c55e" stroke-width="14"/>
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white/85 text-[13px] font-medium">Identity Verification</p>
                                        <div className="bg-[#1e3c34] w-fit px-2 py-[1px] rounded-full mt-0.5">
                                            <p className="text-[#4ade80] text-[10px] md:text-[12px] font-medium">Verified</p>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-white/20 text-base">›</span>
                            </button>
                             <button onClick={() => { navigate(''); setMoreOpen(false) }} className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0 overflow-hidden">
                                        <img src={logo} alt="CoinOva" className="w-7 h-7 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-white/85 text-[13px] font-medium">About CoinOva</p>
                                        <p className="text-white/30 text-[11px]">Version, changelog</p>
                                    </div>
                                </div>
                                <span className="text-white/20 text-base">›</span>
                            </button>
                            <button onClick={() => { navigate(''); setMoreOpen(false) }} className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                        <svg width="20" height="20" viewBox="0 0 300 380" fill="none" stroke="#4485ae" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M150 4 L284 50 L284 170 C284 258 150 310 150 310 C150 310 16 258 16 170 L16 50 Z"/>
                                            <rect x="90" y="70" width="120" height="150" rx="8"/>
                                            <path d="M178 70 L210 102"/>
                                            <path d="M178 70 L178 102 L210 102"/>
                                            <line x1="108" y1="122" x2="192" y2="122"/>
                                            <line x1="108" y1="145" x2="192" y2="145"/>
                                            <line x1="108" y1="168" x2="165" y2="168"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/85 text-[13px] font-medium">Legal & Privacy</p>
                                        <p className="text-white/30 text-[11px]">Terms, data policy</p>
                                    </div>
                                </div>
                                <span className="text-white/20 text-base">›</span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="h-px bg-white/[0.05] mx-3 my-1" />
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/[0.06] transition-colors w-full text-left">
                    <div className="w-8 h-8 rounded-[10px] bg-red-500/[0.08] flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </div>
                    <span className="text-red-400 text-[13px] font-medium">Log out</span>
                </button>
            </div>
        </div>
    )
}