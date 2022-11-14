import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketPlace from "./components/Marketplace/MarketPlace.jsx";
import SellProduct from "./components/SellProduct/SellProduct.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import NavBar from "./components/Navbar/NavBar";
import SideBar from "./components/Sidebar/SideBar";
import { ToastContainer } from "react-toastify";
import Orders from "./components/Orders/Orders";
import OrderDetails from "./components/Orders/OrderDetails.jsx";

import "react-toastify/dist/ReactToastify.min.css";
import Admin from "./components/Admin/Admin.jsx";

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
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
              <Route
                path="/productdetails/:productId"
                element={<ProductDetails />}
              />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </main>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
