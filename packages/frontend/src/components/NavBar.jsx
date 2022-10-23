import React from "react";
import ReactDOM from "react-dom";
import "./navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HomePage() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar--logo">
          <h2>bloXchange</h2>
        </div>
        <div className="navbar--btn">
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}
