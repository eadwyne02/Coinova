import logo from '../assets/coinova-logo.webp'
import BalanceCard from '../components/BalanceCard'
import Portfolio from '../components/Portfolio'
import News from '../components/News'

export default function HomePage(){
    return(
        <div className="relative min-h-screen">
           <div className='absolute top-0 left-0 w-full h-[100px] bg-[#23282e]'></div>
           <div className='absolute top-[100px] left-0 w-full h-[30px] bg-[#181b26]'></div>
           <div className='absolute top-[130px] left-0 w-full bottom-0 bg-[#121621]'></div>
           <div>
            <div className='relative z-10 '>
                <div className='flex justify-between items-center pr-4 pl-3 pt-2'>
                    <div className='flex items-center h-8 w-8 gap-2'>
                        <img src={logo} alt="Coinova logo"  />
                        <div className='flex font-jakarta font-bold text-[1.2rem] tracking-[2px]'>
                            <p className='text-white'>COIN</p>
                            <p className='bg-gradient-to-b from-[#8f37f7] via-[#6b5cf7] to-[#0d82ec] bg-clip-text text-transparent'>OVA</p>
                        </div>
                    </div>
                    <div className='border-1 rounded-full border-gray-600 w-7 h-7 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#eaeaec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </div>
                </div>
                <BalanceCard />
                <div className='mt-8 px-5'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold font-jakarta text-white/80'>My Portfolio</p>
                        <button className='font-medium font-sans font-medium text-[0.9rem] text-[#397fa7]'>See All</button>
                    </div>
                    <Portfolio />
                </div>
                <div className='px-5 mt-5'>
                    <p className='font-bold text-2xl font-jakarta text-white/80'>News</p>
                    <News />
                </div>
            </div>
            
           </div>
        </div>
    )
}