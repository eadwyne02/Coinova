import { useState } from "react";
import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import BottomNav from "./components/BottomNavbar";
import MarketOverview from "./pages/marketOverview";
import TransactionHistory from "./pages/transactionHistory";
import Assets from "./pages/assets";
import Convert from "./pages/convert";
// import Header from "./components/header/homeHeader";
import SplashScreen from "./components/SplashScreen";
// import Settings from "./pages/settings";

function App(){
  const [loading, setLoading] = useState(true)
  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />
 return (
    <div>
      <div className="mb-13">
       
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market" element={<MarketOverview />} />
            <Route path="/history" element={<TransactionHistory />}/>
            <Route path="/assets" element={<Assets />}/>
            <Route path="/convert" element={<Convert />}/>
          </Routes>

      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  )
}
export default App