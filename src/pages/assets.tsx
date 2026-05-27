import AssetsBalanceCard from "../components/assets/assetsBalanceCard"
import Transaction from "../components/assets/transaction"
import AssetsPage from "../components/assets/assetsList"
import Header from "../components/header/header"
function Assets(){
    return(
        <div>
            <Header />
            <div className="min-h-screen bg-[#141720]  pt-3 md:grid md:grid-cols-2 md:gap-2">
                <div className="md:flex md:flex-col md:gap-5">
                    <div className="mx-2 rounded-lg p-4  bg-[#23282e]">
                        <AssetsBalanceCard />
                    </div>
                    <div className="mx-8 mt-4">
                        <Transaction />
                    </div>
                </div>
                <div>
                    <AssetsPage />
                </div>
            </div>
        </div>
    )
}
export default Assets