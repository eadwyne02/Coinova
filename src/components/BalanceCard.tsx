import { useWallet } from "../hooks/useWallet"
import { useCoinList } from "../hooks/useCoinList"
import { usePortfolio } from "../hooks/usePortfolio"

export default function(){
    const { balance } = useWallet()
    const { coins } = useCoinList()
    const { portfolio } = usePortfolio()

    // live USDT value
    const usdtLive = coins.find(c => c.id === 'tether')
    const usdtPrice = usdtLive?.current_price ?? 1
    const usdtValue = balance * usdtPrice

    // all coin holdings value
    const holdings = portfolio
        .filter(item => item.coinId !== 'tether')
        .map(item => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        return item.amount * currentPrice
        })

    const totalValue = holdings.reduce((acc, val) => acc + val, 0) + usdtValue
    return(
        <div className="relative bg-[#0a1f3d] rounded-2xl  mx-5 mt-7">  
                    <div className="absolute top-0 right-0 w-64 h-full bg-[#1565d8] rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute top-1/2 right-8 w-40 h-40 bg-[#4a90e2] rounded-full blur-2xl opacity-25 -translate-y-1/2"></div>
                    <div className="relative z-10 p-6">
                        <p className='text-xs text-gray-400 font-medium font-sans mb-3'>My Balance</p>
                        <div>
                            <div className='flex items-center justify-between'>
                                <p className=' font-jakarta font-bold tracking-tight text-white/80 text-2xl'> ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                 <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                                    <svg width="8" height="8" viewBox="0 0 10 10">
                                        <polygon points="5,0 0,10 10,10" fill="#4ade80" />
                                    </svg>
                                    <span className="text-xs font-semibold text-green-400">0%</span>
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
                                        <p className='text-white/80 font-bold'>$0</p>
                                        <p className='text-white/60 tracking-[-1px]'>Today's Profit</p>
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