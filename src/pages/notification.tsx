import { useNavigate } from "react-router-dom"

export default function Notifications(){
    const navigate = useNavigate()
    return(
        <div className="bg-[#121621] h-screen p-5">
            <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-[6px] rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div>
            <p className="text-white font-jakarta font-bold text-xl leading-tight">Notification</p>
          </div>
        </div>
            <div className=" h-[80vh] flex justify-center items-center">
                <p className="text-white/80 text-xl">No Notification(s) yet</p>
            </div>
        </div>
    )
}