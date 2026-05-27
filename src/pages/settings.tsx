import General from "../components/Settings/general"
import Privacy from "../components/Settings/privacy"
import { useNavigate } from "react-router-dom"

function Settings() {
    const navigate = useNavigate()
    return (
        <div className="bg-[#0f1724] min-h-screen pt-5 pb-10">
            <div className="flex items-center gap-4 px-4 mb-6">
                <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                </button>
                <p className="text-xl font-bold text-white/90">Settings</p>
            </div>
            <div className="flex flex-col gap-6 px-4">
                <General />
                <Privacy />
            </div>
        </div>
    )
}

export default Settings