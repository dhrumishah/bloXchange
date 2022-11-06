import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketPlace from "./components/Marketplace/MarketPlace.jsx";
import SellProduct from "./components/SellProduct/SellProduct.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import NavBar from "./components/Navbar/NavBar";
import SideBar from "./components/Sidebar/SideBar";

function App() {
  return (
    <div className="">
      <Router>
        <header className="sticky top-0 z-50">
          <NavBar />
        </header>
        <main>
          <SideBar />
          <div>
            <Routes>
              <Route path="/" element={<MarketPlace />} />
              <Route path="/sellproduct" element={<SellProduct />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/productdetails/:productId" element={<ProductDetails />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
