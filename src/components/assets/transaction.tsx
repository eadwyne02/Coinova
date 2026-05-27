import { useNavigate } from "react-router-dom"

function Transaction() {
    const navigate = useNavigate()

    const actions = [
        {
            label: "Deposit",
            path: "/Deposit",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <polyline points="19 12 12 19 5 12"/>
                </svg>
            ),
        },
        {
            label: "Sell Crypto",
            path: "/send",
            icon: (
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
            ),
        },
        {
            label: "Convert",
            path: "/Convert",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="17 4 21 8 17 12"/>
                    <line x1="3" y1="8" x2="21" y2="8"/>
                    <polyline points="7 20 3 16 7 12"/>
                    <line x1="21" y1="16" x2="3" y2="16"/>
                </svg>
            ),
        },
    ]

    return (
        <div className="flex items-center justify-between gap-3 px-1">
            {actions.map(({ label, path, icon }) => (
                <button key={label} onClick={() => navigate(path)} className="group flex-1 flex flex-col items-center gap-2.5 cursor-pointer">
                    <div className="relative w-full flex justify-center">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full bg-[#00a9f9]/10 blur-md group-hover:bg-[#00a9f9]/20 transition-all duration-300" />
                        </div>
                        <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0f4963] border border-[#00a9f9]/20 flex items-center justify-center group-hover:bg-[#00a9f9]/20 group-hover:border-[#00a9f9]/50 group-hover:scale-105 transition-all duration-200 shadow-lg shadow-black/30">
                            {icon}
                        </div>
                    </div>
                    <span className="text-[13px] font-medium text-white/50 group-hover:text-white/80 tracking-wide transition-colors duration-200">
                        {label}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default Transaction