import Header from "../components/header/header"
function TransactionHistory(){
    return(
        <div className="">
            <Header />
            <div className="bg-[#141720] min-h-screen  pt-2 px-4">
                <p className="font-bold font-jakarta text-white/90 text-2xl">Transactions</p>
                <div className="flex justify-center items-center h-[60vh]">
                    <p className="text-white/70 font-sans text-xl">No Transaction History yet</p>
                </div>
            </div>
        </div>
    )
}
export default TransactionHistory