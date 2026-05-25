import { useState } from "react"

interface ToggleProps {
    defaultOn?: boolean
    checked?: boolean
    onChange?: (value: boolean) => void
    disabled?: boolean
}

function Toggle({ defaultOn = false, checked, onChange, disabled = false }: ToggleProps) {
    const [internalOn, setInternalOn] = useState(defaultOn)
    const on = checked !== undefined ? checked : internalOn

    const handleClick = () => {
        if (disabled) return
        const next = !on
        if (checked === undefined) setInternalOn(next)
        onChange?.(next)
    }

    return (
        <button
            role="switch"
            aria-checked={on}
            disabled={disabled}
            onClick={handleClick}
            className={`relative w-11 h-6 rounded-full border-none p-0 transition-colors duration-200 flex-shrink-0 cursor-pointer
                ${on ? "bg-[#00a9f9]" : "bg-white/10"}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    )
}

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const Divider = () => <div className="h-px bg-white/[0.05] mx-4" />

function Privacy() {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-white/25 px-1 mb-2">Privacy & Security</p>
            <div className="bg-[#131e30] rounded-2xl border border-white/[0.07] overflow-hidden">

                <div className="flex justify-between items-center px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3 8V5C3 3.895 3.895 3 5 3H8" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M16 3H19C20.105 3 21 3.895 21 5V8" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M3 16V19C3 20.105 3.895 21 5 21H8" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M16 21H19C20.105 21 21 20.105 21 19V16" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M9 9.5V10" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M15 9.5V10" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M12 9.5V13" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M9 15C9 15 10 16.5 12 16.5C14 16.5 15 15 15 15" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/85 text-sm font-medium">Fingerprint & Face ID</p>
                            <p className="text-white/35 text-xs">Biometric login</p>
                        </div>
                    </div>
                    <Toggle defaultOn={false} onChange={(val) => console.log("Biometric:", val)} />
                </div>

                <Divider />

                <div className="flex justify-between items-center px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#00a9f9">
                                <path d="M6 2C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V8L14 2H6Z"/>
                                <path d="M14 2V8H20"/>
                                <path d="M8 13H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M8 17H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M8 9H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/85 text-sm font-medium">Documents</p>
                            <p className="text-white/35 text-xs">ID, proof of address</p>
                        </div>
                    </div>
                    <ChevronRight />
                </div>

                <Divider />

                <div className="flex justify-between items-center px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12,22A17.5,17.5,0,0,0,21,6.7V6L12,2,3,6v.7A17.5,17.5,0,0,0,12,22Z M11,6h2V8H11Z M11,10h2v8H11Z" fill="#00a9f9"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/85 text-sm font-medium">Privacy Policy</p>
                            <p className="text-white/35 text-xs">What data we collect</p>
                        </div>
                    </div>
                    <ChevronRight />
                </div>

                <Divider />

                <div className="flex justify-between items-center px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#00a9f9" strokeWidth="1.5"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="12" cy="16" r="1.5" fill="#00a9f9"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/85 text-sm font-medium">Security Settings</p>
                            <p className="text-white/35 text-xs">PIN, 2FA, sessions</p>
                        </div>
                    </div>
                    <ChevronRight />
                </div>

            </div>

            <div className="mt-4 bg-[#131e30] rounded-2xl border border-white/[0.07] overflow-hidden">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-4 hover:bg-red-500/[0.06] transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    <span className="text-red-400 text-sm font-medium">Sign out</span>
                </button>
            </div>

            <p className="mt-6 text-center text-white/25 text-xs">App version 1.0.0</p>
        </div>
    )
}

export default Privacy