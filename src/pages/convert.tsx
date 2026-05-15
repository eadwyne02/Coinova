import ConvertFunds from "../components/convert/convert"
import Header from "../components/header/header"

function Convert(){
    return(
        <div>
            <Header />
            <div className="bg-[#141720] min-h-screen">
                <p className="text-white/80 pt-5 ml-5 text-2xl font-bold font-jakarta">Convert</p>
                <div>
                    <ConvertFunds />
                </div>
            </div>
        </div>
    )
}
export default Convert