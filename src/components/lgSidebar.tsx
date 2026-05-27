import { navItems } from "./navigationItems"
import { useNavigate, useLocation } from "react-router-dom"

export default function LgSidebar() {
    function getGreeting() {
        const h = new Date().getHours()
        if (h < 12) return 'Good morning'
        if (h < 17) return 'Good afternoon'
        return 'Good evening'
    }

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const isActive = (path: string) => pathname === path

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
                <button>
                    <p className="text-white/75 text-[13px] font-medium">More ...</p>
                </button>
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