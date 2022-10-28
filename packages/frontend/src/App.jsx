import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketPlace from "./components/MarketPlace";
import SellProduct from "./components/SellProduct";

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
