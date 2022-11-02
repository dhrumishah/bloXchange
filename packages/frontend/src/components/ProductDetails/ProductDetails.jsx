import React from "react";
import NavBar from "../Navbar/NavBar";
import Product from "../Product/Product";
import Game from "./../images/game.jpeg";
import Logo from "/src/Logo.svg";
export default function ProductDetails() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main className="mt-[80px] py-12 px-4 relative flex flex-col min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:px-12">
        <div className="relative mx-auto grid grid-cols-1 mt-14 sm:mt-0 gap-8 lg:flex lg:justify-center">
          <Product
            image={Game}
            logo={Logo}
            name="Dhrumi Shah"
            address="0xCb4...Ba5c"
            category="Game"
            title="Fallout Game"
            price="300"
            description="PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!"
            location="Magdeburg, Deutschland"
          />
        </div>
      </main>
    </>
  );
}
