import { useNavigate } from "react-router-dom"

const DEPOSIT_OPTIONS = [
  {
    id: "crypto",
    title: "Crypto Wallet",
    description: "Deposit from an external crypto wallet or exchange",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    badge: "Instant",
    badgeColor: "text-[#22c55e] bg-[#22c55e]/10",
    fees: "No fees",
    time: "~2 mins",
  },
  {
    id: "bank",
    title: "Fiat Bank Transfer",
    description: "Deposit via bank transfer from your local bank account",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="11" width="20" height="9" rx="1" />
        <path d="M2 11l10-7 10 7" />
        <line x1="6" y1="11" x2="6" y2="20" />
        <line x1="10" y1="11" x2="10" y2="20" />
        <line x1="14" y1="11" x2="14" y2="20" />
        <line x1="18" y1="11" x2="18" y2="20" />
      </svg>
    ),
    badge: "15-20 mins",
    badgeColor: "text-[#f59e0b] bg-[#f59e0b]/10",
    fees: "0.5% fee",
    time: "15-20 mins",
  },
  {
    id: "card",
    title: "Debit / Credit Card",
    description: "Instantly deposit using your Visa or Mastercard",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
    badge: "Instant",
    badgeColor: "text-[#22c55e] bg-[#22c55e]/10",
    fees: "1.5% fee",
    time: "Instant",
  },
]

function Deposit() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#141720] pb-24">
      <div className="bg-[#121621] px-4 pt-4 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-[6px] rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div>
            <p className="text-white font-jakarta font-bold text-lg leading-tight">Deposit Funds</p>
            <p className="text-white/40 text-[11px] mt-0.5">Choose a deposit method</p>
          </div>
        </div>
      </div>
      <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase px-4 mt-6 mb-3">
        Select Method
      </p>
      <div className="px-4 flex flex-col gap-3">
        {DEPOSIT_OPTIONS.map((opt) => (
          <button key={opt.id} className="w-full bg-[#1a1f2e] border border-white/[0.07] rounded-2xl px-4 py-4 flex items-center gap-4 hover:bg-white/[0.04] hover:border-[#6b5cf7]/30 active:scale-[0.99] transition-all text-left">
            <div className="w-11 h-11 rounded-xl bg-[#6b5cf7]/10 border border-[#6b5cf7]/15 flex items-center justify-center text-[#6b5cf7] flex-shrink-0">
              {opt.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white font-semibold text-sm">{opt.title}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${opt.badgeColor}`}>
                  {opt.badge}
                </span>
              </div>
              <p className="text-white/40 text-[11px] leading-snug">{opt.description}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] text-white/30">
                  <span className="text-white/50 font-medium">Fees:</span> {opt.fees}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] text-white/30">
                  <span className="text-white/50 font-medium">Time:</span> {opt.time}
                </span>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
      <div className="px-4 mt-6">
        <div className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-white/25 text-[11px] leading-relaxed">
            All deposits are encrypted and secured. Funds are reflected in your balance once the transaction is confirmed.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Deposit