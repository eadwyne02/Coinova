import { useNavigate, useLocation } from "react-router-dom";
// import Deposit from "./deposit";
function HomeTransaction(){
    const navigate = useNavigate()
    const { pathname } = useLocation()
    if (pathname !== '/') return null
    return(
        <div className="absolute bottom-0 left-0 right-0 bg-white/[0.03] z-50 border-t border-white/[0.07] px-5 py-3.5">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate("/deposit")}  className="flex flex-col items-center gap-1.5">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#00a9f9]/[0.08] border border-[#00a9f9]/[0.18] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </div>
            <span className="text-[11px] text-white/45 font-medium">Deposit</span>
          </button>
          <div className="w-px h-[38px] bg-white/[0.07]" />

          <button onClick={() => navigate("/sell")} className="flex flex-col items-center gap-1.5">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#00a9f9]/[0.08] border border-[#00a9f9]/[0.18] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
              </svg>
            </div>
            <span className="text-[11px] text-white/45 font-medium">Sell Crypto</span>
          </button>

          <div className="w-px h-[38px] bg-white/[0.07]" />

          <button onClick={() => navigate("/send")} className="flex flex-col items-center gap-1.5">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#00a9f9]/[0.08] border border-[#00a9f9]/[0.18] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
            <span className="text-[11px] text-white/45 font-medium">Send Crypto</span>
          </button>

        </div>
      </div>
    )
}
export default HomeTransaction