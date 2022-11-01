import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketPlace from "./components/Marketplace/MarketPlace.jsx";
import SellProduct from "./components/SellProduct/SellProduct.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<MarketPlace />} />
          <Route path="/sellproduct" element={<SellProduct />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/productdetails" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
