import React from "react";
import "./sidebar.css";
import Product from "./../svg/product.svg";
import Market from "./../svg/market.svg";
import Profile from "./../svg/profile.svg";
import Contact from "./../svg/contact.svg";
import Bag from "./../svg/bag.svg";
import { useNavigate } from "react-router-dom";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

export default function SideBar() {
  const { address, connector, isConnected } = useAccount();
  const navigate = useNavigate();
  return (
    <div>
      <div className="sidebar--component fixed border-r border-slate-500">
        <div className="sidebar--content">
          <div className="sidebar--col">
            <div className="flex flex-col space-y-5 mb-12">
              <a className="flex items-center" href="">
                <div
                  className="flex items-center sidebar--para"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img src={Market}></img>
                  <p>Marketplace</p>
                </div>
              </a>
              <a className=" flex items-center hover:opacity-90">
                <div
                  className="flex items-center sidebar--para"
                  onClick={() => {
                    navigate("/sellproduct");
                  }}
                >
                  <img src={Product}></img>
                  <p>Sell a product</p>
                </div>
              </a>
              <a className=" flex items-center hover:opacity-90">
                <div
                  className="flex items-center sidebar--para"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  <img src={Bag}></img>
                  <p>My Orders</p>
                </div>
              </a>
              <a className=" flex items-center hover:opacity-90">
                <div
                  className="flex items-center sidebar--para"
                  onClick={() => {
                    navigate("/profile/" + address.toString());
                  }}
                >
                  <img src={Profile}></img>
                  <p>Profile</p>
                </div>
              </a>
            </div>
          </div>
          <div className="border-t border-slate-500 block mb-8"></div>
          <div
            className="flex items-center pl-3 mb-8 text-base sidebar--para"
            onClick={() => {
              navigate("/contact-us");
            }}
          >
            <img src={Contact}></img>
            <p>Contact Us</p>
          </div>
        </div>
      </div>
    </div>
  );
}
