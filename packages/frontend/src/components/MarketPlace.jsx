import React from "react";
import ReactDOM from "react-dom";
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
                  All
                </p>
                <svg
                  viewBox="0 0 11 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#51515F] dark:text-white w-[11px]"
                >
                  <path
                    d="m1 1 3.945 2.63a1 1 0 0 0 1.11 0L10 1"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
