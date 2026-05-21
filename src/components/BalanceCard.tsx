import { useState } from "react"
import { usePortfolioSummary } from "../hooks/usePortfolioSummary"

export default function BalanceCard() {
  const {totalValue, pnlConverted, pnlPct, currency, coinsLoading, coinsError, retry, coins,} = usePortfolioSummary()
    const [showBalance, setShowBalance] = useState(true)
    const formattedValue = totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    const fontSize = formattedValue.length > 10 ? 'text-[26px]' : formattedValue.length > 7 ? 'text-[30px]' : 'text-[36px]'
    if (coinsLoading && coins.length === 0) {
        return (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
            <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#6b5cf7] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-1">
            <p className="text-white/50 text-sm font-medium animate-pulse">
                {currency.code === "usd" ? "Fetching prices..." : `Converting to ${currency.code.toUpperCase()}...`}
            </p>
            <p className="text-white/25 text-xs">This may take a moment</p>
            </div>
        </div>
        )
    }
    if (coinsError) {
    return (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
        </div>
        <div className="flex flex-col items-center gap-1 text-center px-4">
            <p className="text-white/60 text-sm font-medium">Something went wrong</p>
            <p className="text-white/30 text-xs">{coinsError}</p>
        </div>
        <button onClick={retry} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            <span className="text-white/60 text-sm">Try again</span>
        </button>
        </div>
    )}
  return (
    <div>
      <div className="relative z-10 px-[22px] pt-[22px] pb-24">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] text-white/38 tracking-[1.8px] uppercase font-medium font-jakarta">
            My Balance
          </span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="bg-white/[0.05] border border-white/[0.08] rounded-lg p-[5px] flex items-center"
          >
            {showBalance ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        </div>
        <p className="text-[11px] text-white/28 mb-1.5 tracking-wide">Total Portfolio Value</p>
        <div className="flex items-end justify-between gap-3 mb-2.5">
          <p className={`${fontSize} font-bold text-white tracking-[-1.5px] leading-none font-jakarta`}>
            {showBalance ? `${currency.symbol} ${formattedValue}` : '*****'}
          </p>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-[5px] border flex-shrink-0 mb-1 ${pnlConverted >= 0 ? 'bg-green-400/10 border-green-400/[0.22]' : 'bg-red-400/10 border-red-400/[0.22]'}`}>
            <svg width="8" height="8" viewBox="0 0 10 10" style={{ transform: pnlConverted < 0 ? 'rotate(180deg)' : 'none' }}>
              <polygon points="5,0 0,10 10,10" fill={pnlConverted < 0 ? '#ef4444' : '#4ade80'} />
            </svg>
            <span className={`text-xs font-semibold ${pnlConverted >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {showBalance ? `${pnlConverted >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%` : '*****'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00a9f9]/10 border border-[#00a9f9]/20 flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <span className="text-xs text-white/40">Today's P&L</span>
          <span className={`text-xs font-semibold ${pnlConverted >= 0 ? 'text-[#00a9f9]' : 'text-red-400'}`}>
            {showBalance
              ? `${pnlConverted >= 0 ? '+' : ''}$${Math.abs(pnlConverted).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`
              : '*****'}
          </span>
        </div>
      </div>
      

    </div>
  )
}