function Transaction(){
    return(
        <div className="flex justify-between"> 
            <button className="flex flex-col items-center">
                <div className="bg-[#0f4963] flex justify-center items-center h-14 w-14 rounded-full items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <polyline points="19 12 12 19 5 12"/>
                    </svg>
                </div>
                <p className="text-md text-white/60 text-sans">Deposit</p>
            </button>
            <button className="flex flex-col items-center">
                <div className="bg-[#0f4963] flex justify-center items-center h-14 w-14 rounded-full items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5"/>
                        <polyline points="5 12 12 5 19 12"/>
                    </svg>
                </div>
                <p className="text-md text-white/60 text-sans">Withdraw</p>
            </button>
            <button className="flex flex-col items-center">
                <div className="bg-[#0f4963] flex justify-center items-center h-14 w-14 rounded-full items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="17 4 21 8 17 12"/>
                        <line x1="3" y1="8" x2="21" y2="8"/>
                        <polyline points="7 20 3 16 7 12"/>
                        <line x1="21" y1="16" x2="3" y2="16"/>
                    </svg>
                </div>
                <p className="text-md text-white/60 text-sans">Convert</p>
            </button>
        </div>
    )
}
export default Transaction