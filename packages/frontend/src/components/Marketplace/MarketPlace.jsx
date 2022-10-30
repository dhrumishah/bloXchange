import React from "react";
import ReactDOM from "react-dom";
import DropDown from "../DropDown";
import "./marketplace.css";
import Magnify from "./../svg/magnifying-glass.svg";
import Game from "./../images/game.jpeg"
import Logo from "/src/Logo.svg";
import NavBar from "../Navbar/NavBar";
import SideBar from "../Sidebar/SideBar";
import Item from "../Item/Item";

export default function MarketPlace() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main>
        <SideBar />
        <div>
          <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
            <div className="flex flex-col w-full">
              <div className="flex ml-auto items-center mb-8">
                <img src={Magnify}></img>
                <p className="ml-auto mr-4 text-[18px] text-[#51515F] dark:text-[#C9C9E7] font-medium">
                  Category
                </p>
                <div className="relative">
                  <button class="outline-none flex items-center hover:opacity-90">
                    <p class="text-[#51515F] text-[18px] mr-2 font-semibold dark:text-white">
                      <DropDown />
                    </p>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <Item 
                  title="Fallout Game"
                  price="300"
                  description="PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!"
                  location = "Magdeburg, Deutschland"
                />
                <Item 
                  title="Fallout Game"
                  price="300"
                  description="PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!"
                  location = "Magdeburg, Deutschland"
                />
                <Item 
                  title="Fallout Game"
                  price="300"
                  description="PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!"
                  location = "Magdeburg, Deutschland"
                />        
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}
