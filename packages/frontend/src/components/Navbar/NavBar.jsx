import React from "react";
import "./navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <nav className="navbar fixed border-b border-slate-500 nav-dis">
        <div className="navbar--logo cursor-pointer" onClick={() => navigate("/")}>
          <h2>bloXchange</h2>
        </div>
        <div className="navbar--btn">
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}
