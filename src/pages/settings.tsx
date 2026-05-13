import General from "../components/Settings/general"
import Privacy from "../components/Settings/privacy"
function settings(){
    return(
        <div className="bg-[#141720] min-h-screen pt-5 pb-10    ">
            <p className="text-3xl font-bold font-jakarta text-white/90 text-center mb-5">Settings</p>
            <div className="flex flex-col gap-5">
                <General />
                <Privacy />
            </div>
        </div>
    )
}
export default settings