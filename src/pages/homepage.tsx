
import BalanceCard from '../components/BalanceCard'
import Portfolio from '../components/Portfolio'
import News from '../components/News'
import Header from '../components/header/homeHeader'

export default function HomePage(){
    return(
        <div >
           <Header />
           <div className="pt-30 min-h-screen bg-[#121621] pt-2">
            <div className='relative z-10 '>
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