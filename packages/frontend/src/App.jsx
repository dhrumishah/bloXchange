import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketPlace from "./components/Marketplace/MarketPlace.jsx";
import SellProduct from "./components/SellProduct/SellProduct";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<MarketPlace />} />
          <Route path="/SellProduct" element={<SellProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
