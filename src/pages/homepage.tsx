
import BalanceCard from '../components/BalanceCard'
import Portfolio from '../components/Portfolio'
import News from '../components/News'
import Header from '../components/header/homeHeader'
import HomeTransaction from '../components/homeTransaction'
import { useState } from 'react'
import Sidebar from '../components/sidebar'

export default function HomePage(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return(
        <div>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Header onAvatarClick={() => setIsSidebarOpen(prev => !prev)}  />
            
           <div className="pt-30 min-h-screen bg-[#121621] pt-2">
            <div className='relative z-10 md:hidden lg:hidden'>
                <div className="mx-5 rounded-[24px] overflow-hidden relative border border-white/[0.07]" style={{ background: 'linear-gradient(135deg, #0c1f3f, #0a1630, #071020)' }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 70% 55% at 95% 5%, rgba(21,101,216,0.38), transparent 65%),
                     radial-gradient(ellipse 45% 45% at 5% 90%, rgba(74,144,226,0.1), transparent 60%)`
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: '28px 28px'
      }} />
                    <BalanceCard />
                    <HomeTransaction />
                </div>
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
            <div className='hidden relative z-10  md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 '>
                <div>
                    <div className="mx-5 rounded-[24px] overflow-hidden relative border border-white/[0.07]" style={{ background: 'linear-gradient(135deg, #0c1f3f, #0a1630, #071020)' }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 55% at 95% 5%, rgba(21,101,216,0.38), transparent 65%),
                     radial-gradient(ellipse 45% 45% at 5% 90%, rgba(74,144,226,0.1), transparent 60%)`}} />
                    <div className="absolute inset-0 pointer-events-none" style={{backgroundImage: `linear-gradient(rgba(214, 70, 70, 0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,backgroundSize: '28px 28px'}} />
                    <BalanceCard />
                    <HomeTransaction />
                </div>
                <div className='px-5 mt-5'>
                    <p className='font-bold text-2xl font-jakarta text-white/80'>News</p>
                    <News />
                </div>
                </div>
                <div className='mt-8 px-5'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold font-jakarta text-white/80'>My Portfolio</p>
                        <button className='font-medium font-sans font-medium text-[0.9rem] text-[#397fa7]'>See All</button>
                    </div>
                    <Portfolio />
                </div>
            </div>
           </div>
        </div>
    )
}