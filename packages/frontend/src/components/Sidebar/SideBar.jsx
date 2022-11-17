import React from "react";
import "./sidebar.css";
import Product from "./../svg/product.svg";
import Market from "./../svg/market.svg";
import Profile from "./../svg/profile.svg";
import Contact from "./../svg/contact.svg";
import Bag from "./../svg/bag.svg";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

export default function SideBar() {
  const { address, connector, isConnected } = useAccount();
  return (
    <div>
      <div className="sidebar--component fixed border-r border-slate-500">
        <div className="sidebar--content">
          <div className="sidebar--col">
            <div className="flex flex-col space-y-5 mb-12">
              <Link to={"/"} className="flex items-center sidebar--para">
                <img src={Market}></img>
                <p>Marketplace</p>
              </Link>
              <Link
                className="flex items-center sidebar--para"
                to="/sellproduct"
              >
                <img src={Product}></img>
                <p>Sell a product</p>
              </Link>
              <Link className="flex items-center sidebar--para" to="/orders">
                <img src={Bag}></img>
                <p>My Orders</p>
              </Link>
              <Link
                className="flex items-center sidebar--para"
                to={"/profile/" + address?.toString()}
              >
                <img src={Profile}></img>
                <p>Profile</p>
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-500 block mb-8"></div>
          <Link
            className="flex items-center pl-3 mb-8 text-base sidebar--para"
            to="/contact-us"
          >
            <img src={Contact}></img>
            <p>Contact Us</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
