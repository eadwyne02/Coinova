import { useState } from "react"
import { useWallet } from "../../hooks/useWallet";
import { useCoinList } from "../../hooks/useCoinList";
import { usePortfolio } from "../../hooks/usePortfolio";

function AssetsBalanceCard(){
    const [showBalance, setShowBalance] = useState(true);
    const { balance } = useWallet()
    const { coins } = useCoinList()
    const { portfolio } = usePortfolio()

    const usdtLive = coins.find(c => c.id === 'tether')
    const usdtPrice = usdtLive?.current_price ?? 1
    const usdtValue = balance * usdtPrice

    const btcLive = coins.find(c => c.id === "bitcoin")
    const btcPrice = btcLive?.current_price ?? 1
   
    const pnl = portfolio.filter(item => item.coinId !== 'tether').reduce((acc, item) => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        const currentValue = item.amount * currentPrice
        const costBasis = item.amount * item.buyPrice
        return acc + (currentValue - costBasis)
    }, 0)
    const pnlPct = portfolio.filter(i => i.coinId !== 'tether').length > 0
    ? (pnl / portfolio.filter(i => i.coinId !== 'tether').reduce((acc, item) => acc + item.amount * item.buyPrice, 0)) * 100
    : 0
    const holdings = portfolio
        .filter(item => item.coinId !== 'tether')
        .map(item => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        return item.amount * currentPrice
        })
    const totalValue = holdings.reduce((acc, val) => acc + val, 0) + usdtValue
    const totalInBtc = totalValue / btcPrice
    return(
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <p className="text-white/50 text-sm font-medium">Total Assets</p>
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
                    <div className="flex gap-2 items-end">
                        <p className="text-3xl tracking-tight font-medium font-jakarta text-white/90">{showBalance ? totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }): "*****"}</p>
                        <button className="flex items-end">
                            <p className="text-white/60 font-medium text-sm">USD</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#9096a0" stroke="none">
                                <path d="M6 9l6 6 6-6z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-1 items-center mt-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9096a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 9 Q8 6 12 9 Q16 12 19 9"/>
                            <path d="M5 15 Q8 12 12 15 Q16 18 19 15"/>
                        </svg>
                        <p className="text-[#9096a0] text-sm">{showBalance ? `${totalInBtc.toFixed(6)} BTC`: '*****'}</p>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9096a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <p className="text-[#9096a0] text-sm">Today's P&L</p>
                        <button className={`text-sm ${pnl >= 0 ? 'text-[#00a9f9]' : 'text-red-400'}`}>
                            {showBalance
                            ? `${pnl >= 0 ? '+' : ''}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD (${pnl >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)`
                            : '*****'
                            }
                        </button>
                    </div>
                    <div className="h-px opacity-40 w-full bg-[#9096a0] my-2"></div>
                    <div className="flex gap-20">
                        <div>
                            <p className="text-[#9096a0]">Available balance</p>
                            <div className=" flex gap-1 items-end">
                                <p className="font-medium text-white/70 text-medium">{showBalance ? totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "*****"}</p>
                                <p className="text-[#9096a0] text-xs">USD</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#9096a0]">In Use</p>
                            <div className="flex items-end gap-1">
                                <p className="font-medium text-white/70 text-medium">{showBalance ? 0.00 : "*****"}</p>
                                <p className="text-[#9096a0] text-xs">USD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AssetsBalanceCard