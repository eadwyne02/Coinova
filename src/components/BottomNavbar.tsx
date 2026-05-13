import { useNavigate, useLocation } from "react-router-dom";
export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path: string) => pathname === path

    return(
       <div className="bg-[#23282e] px-5 py-3 border-t border-white/[0.06]">
            <div className="flex justify-between items-center">
                <button onClick={() => navigate('/')} className="flex flex-col items-center p-2">{isActive('/') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a9f9" stroke="none">
                    <path d="M12 2.1L2 9.5V21a1 1 0 0 0 1 1h6v-7h6v7h6a1 1 0 0 0 1-1V9.5L12 2.1z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                    <path d="M9 21V12h6v9" />
                    </svg>
                )}
                </button>
                <button onClick={() => navigate('/history')} className="flex flex-col items-center p-2"> {isActive('/history') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a9f9" stroke="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.75 5a.75.75 0 0 0-1.5 0v5.25c0 .199.079.39.22.53l3 3a.75.75 0 1 0 1.06-1.06L12.75 11.69V7z"/>
                    </svg>
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9"/>
                        <polyline points="12 7 12 12 15.5 14.5"/>
                    </svg>
                    )}
                </button>
                <button onClick={() => navigate('/exchange')} className="flex flex-col items-center p-2"> {isActive('/exchange') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a9f9" stroke="none">
                        <path d="M18.293 3.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L19.586 9H3a1 1 0 0 1 0-2h16.586l-1.293-1.293a1 1 0 0 1 0-1.414zM5.707 13.293a1 1 0 0 1 0 1.414L4.414 16H21a1 1 0 0 1 0 2H4.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0z"/>
                    </svg>) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="17 4 21 8 17 12"/>
                        <line x1="3" y1="8" x2="21" y2="8"/>
                        <polyline points="7 20 3 16 7 12"/>
                        <line x1="21" y1="16" x2="3" y2="16"/>
                    </svg>
                    )}
                </button>
                <button onClick={()=> navigate('/market')} className="flex flex-col items-center p-2"> {isActive('/market') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a9f9" stroke="none">
                        <path d="M6 2h-.5a.5.5 0 0 0-.5.5v2H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v2.5a.5.5 0 0 0 1 0V10h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6V2.5A.5.5 0 0 0 6 2zM12.5 5h-.5V2.5a.5.5 0 0 0-1 0V5h-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v2.5a.5.5 0 0 0 1 0V13h1a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM18 7h-.5V4.5a.5.5 0 0 0-1 0V7h-1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1v2.5a.5.5 0 0 0 1 0V14h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"/>
                    </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="2" x2="5" y2="4"/>
                        <rect x="3.5" y="4" width="3" height="6" rx="0.5"/>
                        <line x1="5" y1="10" x2="5" y2="13"/>
                        <line x1="12" y1="5" x2="12" y2="7"/>
                        <rect x="10.5" y="7" width="3" height="5" rx="0.5"/>
                        <line x1="12" y1="12" x2="12" y2="15"/>
                        <line x1="19" y1="3" x2="19" y2="6"/>
                        <rect x="17.5" y="6" width="3" height="7" rx="0.5"/>
                        <line x1="19" y1="13" x2="19" y2="16"/>
                    </svg>
                )}
                </button><button onClick={() => navigate('/assets')} className="flex flex-col items-center p-2"> {isActive('/assets') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a9f9" stroke="none">
                        <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-10-2h4v2h-4V5zm3 11h-2v-2H9v-2h2v-2h2v2h2v2h-2v2z"/>
                    </svg>) : ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                        <line x1="12" y1="12" x2="12" y2="16"/>
                        <line x1="10" y1="14" x2="14" y2="14"/>
                        </svg> )}
                </button>
                
            </div>
        </div>
    )
}