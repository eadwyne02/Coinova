import AssetsBalanceCard from "../components/assets/assetsBalanceCard"
import Transaction from "../components/assets/transaction"
import AssetsPage from "../components/assets/assetsList"
function Assets(){
    return(
        <div className="min-h-screen bg-[#141720] pt-3">
            <div className="mx-2 rounded-lg p-4  bg-[#23282e]">
                <AssetsBalanceCard />
            </div>
            <div className="mx-8 mt-4">
                <Transaction />
            </div>
            <div>
                <AssetsPage />
            </div>
        </div>
    )
}
export default Assets