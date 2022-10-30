import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketPlace from "./components/Marketplace/MarketPlace.jsx";
import SellProduct from "./components/SellProduct/SellProduct";
import Profile from "./components/Profile/Profile.jsx";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          {/* <Route path='/' element={<Navigate to=' />} /> */}
          <Route path="/" element={<MarketPlace />} />
          <Route path="/sellproduct" element={<SellProduct />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
