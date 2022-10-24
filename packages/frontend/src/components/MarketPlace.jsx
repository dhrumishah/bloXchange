import React from "react";
import ReactDOM from "react-dom";
import DropDown from "./DropDown";
import "./marketplace.css";
import Magnify from "./svg/magnifying-glass.svg";

export default function MarketPlace() {
  return (
    <div>
      <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
        <div className="flex flex-col w-full">
          <div className="flex ml-auto items-center">
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
        </div>
      </main>
    </div>
  );
}
