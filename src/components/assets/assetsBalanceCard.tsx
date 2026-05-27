import { useState } from "react"
import { usePortfolioSummary } from "../../hooks/usePortfolioSummary"
import { CURRENCIES } from "../../store/currencyStore"
 
function AssetsBalanceCard() {
    const {totalValue, totalInBtc, pnlConverted, pnlPct, currency, changeCurrency, switching, coinsLoading, coinsError, retry, coins,} = usePortfolioSummary()
    const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)
    const [showBalance, setShowBalance] = useState(true)
    if (coinsLoading && coins.length === 0) {
        return (
        <div className="flex flex-col items-center justify-center py-5 gap-4">
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
    )
    }
    return(
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <p className="text-white/50 text-sm font-medium md:text-[16px]">Total Assets</p>
                    <button onClick={()=>{setShowBalance(!showBalance)}}>
                        {showBalance ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                        )}
                    </button> 
                </div>
                <div>
                   <div className="flex  gap-2 items-end relative">
                        <p className="text-3xl md:text-4xl  tracking-tight font-medium font-jakarta text-white/90">
                            {showBalance
                            ? `${currency.symbol} ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : '*****'}
                        </p>
                        <button className="flex items-end" onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}>
                            <p className="text-white/60 font-medium text-sm md:text-[16px]">{currency.code.toUpperCase()}</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#9096a0" stroke="none">
                            <path d="M6 9l6 6 6-6z" />
                            </svg>
                        </button>
                        {showCurrencyPicker && (
                            <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowCurrencyPicker(false)}/>
                            <div className="absolute top-8 left-0 z-50 bg-[#181e27] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl min-w-[200px]">
                                {CURRENCIES.map((c, i) => (
                                <button key={c.code} onClick={() => { changeCurrency(c.code); setShowCurrencyPicker(false) }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all ${i !== CURRENCIES.length - 1 ? 'border-b border-white/[0.06]' : ''} ${currency.code === c.code ? 'bg-white/5' : ''}`}>
                                    <span className="text-lg">{c.flag}</span>
                                    <div className="text-left flex-1">
                                    <p className="text-sm font-semibold text-white">{c.code.toUpperCase()}</p>
                                    <p className="text-[10px] text-white/40">{c.name}</p>
                                    </div>
                                    <span className="text-sm text-white/50">{c.symbol}</span>
                                    {currency.code === c.code && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    )}
                                </button>
                                ))}
                            </div>
                            </>
                        )}
                        </div>
                    <div className="flex items-center">
                        <div className="flex gap-1 items-center mt-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9096a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 9 Q8 6 12 9 Q16 12 19 9"/>
                                <path d="M5 15 Q8 12 12 15 Q16 18 19 15"/>
                            </svg>
                            <p className="text-[#9096a0] text-sm md:text-[16px]">{showBalance ? `${totalInBtc.toFixed(6)} BTC`: '*****'}</p>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9096a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            
                        </div>
                        {switching && (
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6b5cf7] animate-pulse" />
                                <p className="text-[12px] text-white/30 animate-pulse">
                                Updating to {currency.code.toUpperCase()}...
                                </p>
                            </div>
                            )}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <p className="text-[#9096a0] text-sm md:text-[16px]">Today's P&L</p>
                        <button className={`text-sm md:text-[16px] ${pnlConverted >= 0 ? 'text-[#00a9f9]' : 'text-red-400'}`}>
                            {showBalance
                                ? `${pnlConverted >= 0 ? '+' : ''}${currency.symbol}${Math.abs(pnlConverted).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${pnlConverted >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)`
                                : '*****'
                            }
                        </button>
                    </div>
                    <div className="h-px opacity-40 w-full bg-[#9096a0] my-2"></div>
                    <div className="flex gap-20">
                        <div>
                            <p className="text-[#9096a0] md:text-[16px]">Available balance</p>
                            <div className=" flex gap-1 items-center">
                                <p className="text-[#9096a0] md:text-[16px]">{currency.symbol}</p> 
                                <p className="font-medium text-white/70 text-medium md:text-[17px]">{showBalance ? totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "*****"}</p>
                                
                            </div>
                        </div>
                        <div>
                            <p className="text-[#9096a0] md:text-[17px]">In Use</p>
                            <div className="flex items-end gap-1">
                                <p className="text-[#9096a0]  md:text-[17px]">{currency.symbol}</p> 
                                <p className="font-medium text-white/70 text-medium  md:text-[17px]">{showBalance ? 0.00 : "*****"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AssetsBalanceCard