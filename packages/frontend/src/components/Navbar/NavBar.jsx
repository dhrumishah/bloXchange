import React from "react";
import "./navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <nav className="navbar fixed border-b border-slate-500 nav-dis">
        <Link className="navbar--logo cursor-pointer" to="/">
          <h2>bloXchange</h2>
        </Link>
        <div className="navbar--btn">
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}
