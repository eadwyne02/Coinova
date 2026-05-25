const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

function General() {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-white/25 px-1 mb-2">General</p>
            <div className="bg-[#131e30] rounded-2xl border border-white/[0.07] overflow-hidden">

                <div className="flex justify-between items-center px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#00a9f9">
                                <path d="M12 2C11.172 2 10.5 2.672 10.5 3.5V4.198C7.9 4.864 6 7.219 6 10V16L4 18H20L18 16V10C18 7.219 16.1 4.864 13.5 4.198V3.5C13.5 2.672 12.828 2 12 2Z"/>
                                <path d="M9.5 18C9.5 19.381 10.619 20.5 12 20.5C13.381 20.5 14.5 19.381 14.5 18H9.5Z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/85 text-sm font-medium">Notifications</p>
                            <p className="text-white/35 text-xs">Alerts, push, email</p>
                        </div>
                    </div>
                    <ChevronRight />
                </div>

                <div className="h-px bg-white/[0.05] mx-4" />

                <div className="flex justify-between items-center px-4 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-white/[0.05] flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7 15.9919C5.89543 15.9919 5 15.0965 5 13.9919V10.9919C5 9.88737 5.89543 8.99194 7 8.99194C8.10457 8.99194 9 9.88737 9 10.9919V13.9919C9 15.0965 8.10457 15.9919 7 15.9919Z" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M17 15.9919C15.8954 15.9919 15 15.0965 15 13.9919V10.9919C15 9.88737 15.8954 8.99194 17 8.99194C18.1046 8.99194 19 9.88737 19 10.9919V13.9919C19 15.0965 18.1046 15.9919 17 15.9919Z" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19.75 11V9C19.75 4.71979 16.2802 1.25 12 1.25C7.71979 1.25 4.25 4.71979 4.25 9V11" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M18.25 14C18.2414 16.8289 16.2742 19.2771 13.5113 19.8951" stroke="#00a9f9" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/85 text-sm font-medium">Contact Us</p>
                            <p className="text-white/35 text-xs">Support, feedback</p>
                        </div>
                    </div>
                    <ChevronRight />
                </div>

            </div>
        </div>
    )
}

export default General