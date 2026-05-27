import logo from '../assets/coinova-logo.webp'
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navigate = useNavigate()
    return (
        <div className={`fixed inset-0 top-0 left-0 h-full w-[75%] max-w-[400px] p-4 bg-[#0f1724] z-[200] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-end mb-4">
                <button onClick={onClose} className="bg-white/[0.07] text-white/50 w-8 h-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-sm md:text-lg hover:bg-white/10 transition-colors">✕</button>
            </div>
            <div className="relative rounded-2xl p-5 border border-white/[0.07] bg-[#131e30] overflow-hidden mb-5">
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#1565d8]/20 pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

                <div className="relative flex flex-col items-center">
                    <div className="relative mb-3">
                        <div className="w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden bg-[#dadde2]">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-full h-full" />
                        </div>
                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#131e30]" />
                    </div>
                    <p className="text-white/90 font-semibold text-[15px] tracking-wide md:text-[17px]">Anonymous A.</p>
                    <p className="text-white/40 text-xs  md:text-sm mb-3">anonymous@gmail.com</p>
                    <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/25 rounded-full px-3 py-1">
                        <svg width="11" height="13" viewBox="0 0 160 185" xmlns="http://www.w3.org/2000/svg">
                            <path d="M80 0 L155 28 L155 100 C155 148 80 185 80 185 C80 185 5 148 5 100 L5 28 Z" fill="#22c55e" stroke="#16a34a" stroke-width="6"/>
                            <polyline points="45,95 68,120 115,72" fill="none" stroke="white" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span className="text-green-400 text-xs  md:text-sm font-medium">Verified account</span>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <p className="uppercase text-white/25 text-[10px]  md:text-[15px] font-semibold tracking-[1.5px] px-1 mb-2">Account & Security</p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 170 210" fill="none" stroke="#4485ae" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="85" cy="55" r="32"/>
                                    <path d="M0 210 C0 165 15 138 40 125 C55 118 68 114 85 114 C102 114 115 118 130 125 C155 138 170 165 170 210"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white/85 text-sm md:text-[16px] font-medium">Profile Details</p>
                                <p className="text-white/35 text-xs  md:text-sm">Name, phone, address</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-white/20 text-base">›</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 300 260" fill="none" stroke="#4485ae" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
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
                            <div>
                                <p className="text-white/85 text-sm md:text-[16px] font-medium">Identity Verification</p>
                                <div className="bg-[#1e3c34] w-fit px-2 py-[1px] rounded-full mt-0.5">
                                    <p className="text-[#4ade80] text-[10px] md:text-[12px] font-medium">Verified</p>
                                </div>
                            </div>
                        </div>
                        <span className="text-white/20 text-base">›</span>
                    </div>
                    <div onClick={() => navigate("/setting")} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 100 100" fill="none" stroke="#4485ae" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M49 4 L55 4 L58 16 C62 17 66 19 70 22 L82 17 L87 21 L78 31 C80 35 81 39 81 44 L93 47 L93 53 L81 56 C80 61 78 65 76 69 L85 79 L81 83 L69 74 C65 77 61 79 57 80 L54 92 L48 92 L45 80 C41 79 37 77 33 74 L21 83 L17 79 L26 69 C24 65 22 61 21 56 L9 53 L9 47 L21 44 C21 39 22 35 24 31 L15 21 L20 17 L32 22 C36 19 40 17 44 16 Z"/>
                                    <circle cx="51" cy="50" r="16"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white/85 text-sm font-medium md:text-[16px]">Account Settings</p>
                                <p className="text-white/35 text-xs md:text-sm">Preferences, security</p>
                            </div>
                        </div>
                        <span className="text-white/20 text-base">›</span>
                    </div>
                </div>
            </div>
            <div className="h-px bg-white/[0.05] mb-5" />
            <div className="mb-5">
                <p className="uppercase text-white/25 text-[10px] font-semibold tracking-[1.5px] px-1 mb-2 md:text-[15px]">Support & System</p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 260 310" fill="none" stroke="#4485ae" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10 L220 10 C230 10 238 18 238 28 L238 148 C238 158 230 166 220 166 L130 166 L108 194 L86 166 L20 166 C10 166 2 158 2 148 L2 28 C2 18 10 10 20 10 Z"/>
                                    <path d="M98 68 C98 52 108 44 120 44 C132 44 142 53 142 64 C142 80 122 83 120 96 L120 106"/>
                                    <circle cx="120" cy="122" r="8" fill="#4485ae" stroke="none"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white/85 text-sm md:text-[16px] font-medium">Help Center</p>
                                <p className="text-white/35 text-xs  md:text-sm">FAQs, contact support</p>
                            </div>
                        </div>
                        <span className="text-white/20 text-base">›</span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0 overflow-hidden">
                                <img src={logo} alt="CoinOva" className="w-7 h-7 object-contain" />
                            </div>
                            <div>
                                <p className="text-white/85 md:text-[16px] text-sm font-medium">About CoinOva</p>
                                <p className="text-white/35 md:text-sm text-xs">Version, changelog</p>
                            </div>
                        </div>
                        <span className="text-white/20 text-base">›</span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
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
                                <p className="text-white/85 text-sm md:text-[16px] font-medium">Legal & Privacy</p>
                                <p className="text-white/35 md:text-sm text-xs">Terms, data policy</p>
                            </div>
                        </div>
                        <span className="text-white/20 text-base">›</span>
                    </div>
                </div>
            </div>
            <div className="h-px bg-white/[0.05] mb-4" />
            

        </div>
    )
}