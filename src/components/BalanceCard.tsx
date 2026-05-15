import { useState } from "react"
import { useWallet } from "../hooks/useWallet"
import { useCoinList } from "../hooks/useCoinList"
import { usePortfolio } from "../hooks/usePortfolio"

export default function(){
    const { balance } = useWallet()
    const { coins } = useCoinList()
    const { portfolio } = usePortfolio()

    const [showBalance, setShowBalance] = useState(true);
  
    const usdtLive = coins.find(c => c.id === 'tether')
    const usdtPrice = usdtLive?.current_price ?? 1
    const usdtValue = balance * usdtPrice

    const pnl = portfolio
    .filter(item => item.coinId !== 'tether')
    .reduce((acc, item) => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        const currentValue = item.amount * currentPrice
        const costBasis = item.amount * item.buyPrice
        return acc + (currentValue - costBasis)
    }, 0)

    const pnlPct = portfolio.filter(i => i.coinId !== 'tether').length > 0
    ? (pnl / portfolio.filter(i => i.coinId !== 'tether').reduce((acc, item) => acc + item.amount * item.buyPrice, 0)) * 100: 0

    const holdings = portfolio
        .filter(item => item.coinId !== 'tether')
        .map(item => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        return item.amount * currentPrice
        })

    const totalValue = holdings.reduce((acc, val) => acc + val, 0) + usdtValue
    return(
        <div className="relative bg-[#0a1f3d] rounded-2xl  mx-5">  
                    <div className="absolute top-0 right-0 w-64 h-full bg-[#1565d8] rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute top-1/2 right-8 w-40 h-40 bg-[#4a90e2] rounded-full blur-2xl opacity-25 -translate-y-1/2"></div>
                    <div className="relative z-10 p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <p className='text-sm text-gray-400 font-medium font-sans'>My Balance</p>
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
                            <div className='flex items-center justify-between'>
                                <p className=' font-jakarta font-bold tracking-tight text-white/80 text-2xl'> {showBalance? `${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`:"*****"}</p>
                                 <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                                    <svg width="8" height="8" viewBox="0 0 10 10" style={{transform: pnl < 0 ? 'rotate(180deg)': 'rotate(0deg)'}}>
                                        <polygon points="5,0 0,10 10,10" fill={pnl<0 ? "#ef4444": "#4ade80"} />
                                    </svg>
                                    <span className={`text-xs font-semibold ${pnl >=0 ? 'text-[#00a9f9]': 'text-red-400'}`}>{showBalance? `${pnlPct.toFixed(2)}%`:"*****" }</span>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex mt-2 mb-8'>
                                    <div>
                                        <svg width="20" height="20" viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                                <path d="M2 1L8 5L2 9" fill="none" stroke="#ced4dd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </marker>
                                            </defs>
                                            <polyline points="60,200 200,90 340,160 500,10" fill="none" stroke="#ced4dd" stroke-width="42" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arrow)"/>
                                        </svg>
                                    </div>
                                    <div className='flex gap-2 font-sans text-xs '>
                                        <p className="text-[#9096a0] text-sm">Today's P&L</p>
                                        <button className={`text-sm ${pnl >= 0 ? 'text-[#00a9f9]' : 'text-red-400'}`}>
                                            {showBalance ? `${pnl >= 0 ? '+' : ''}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD` : '*****'}
                                        </button>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-[-7%] z-10 px-5  w-full'>
                        <div className='bg-[#23282e] py-2 px-4 rounded-2xl'>
                            <div className='flex items-center justify-between'>
                            <button className='flex flex-col gap-1  items-center justify-center'>
                               <div className='bg-[#1b3b52] p-1 rounded-full'>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"/>
                                        <polyline points="19 12 12 19 5 12"/>
                                    </svg>
                               </div>
                               <div className='text-xs text-white/80'>Deposit</div>
                            </button>
                            <div className='w-[1px] h-10 rounded-md bg-gray-600'></div>
                            <div className='flex flex-col gap-1 items-center justify-center'>
                               <div className='bg-[#1b3b52] p-1 rounded-full'>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="#4a9fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="19" x2="12" y2="5" />
                                        <polyline points="5 12 12 5 19 12" />
                                    </svg> 
                               </div>
                               <div className='text-xs text-white/80'>Sell Crypto</div>
                            </div>
                            <div className='w-[1px] h-10 rounded-md bg-gray-600'></div>
                            <div className='flex flex-col gap-1 items-center justify-center'>
                               <div className='bg-[#1b3b52] p-1 rounded-full'>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="#4a9fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                               </div>
                               <div className='text-xs text-white/80'>Send Crypto</div>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
    )
}