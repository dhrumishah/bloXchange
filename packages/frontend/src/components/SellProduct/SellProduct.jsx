import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../Navbar/NavBar";
import SideBar from "../Sidebar/SideBar";
import DropDown from "../DropDown";
import Item from "../Item/Item";

export default function SellProduct() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main>
        <SideBar />
        <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
          <div className="flex flex-col w-full sm:max-w-[633px]">
            <h1 className="text-[25px] font-semibold mb-10 text-[#30cfd0]">
              Want to sell your product?
            </h1>
            <label
              className="block text-[17px] font-medium mb-4 text-white"
              for="add-title"
            >
              What's the title of your Product?
            </label>
            <div class="relative mb-12">
              <input
                id="add-title"
                type="text"
                placeholder="Enter Product's title"
                class="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] color:white"
              ></input>
            </div>
            <label
              className="block text-[17px] font-medium mb-4 text-white"
              for="add-title"
            >
              Select your Product's Category
            </label>
            <div className="mb-12 w-full h-[40px] font-medium" id="add-title">
              <DropDown />
            </div>
            <div className="relative mb-12">
              <div className="flex flex-col w-full">
                <label
                  className="block text-[17px] font-medium mb-4 text-white"
                  for="priceUSD"
                >
                  Price ($USD)
                </label>
                <input
                  id="priceUsd"
                  className="outline-none font-medium px-4 py-2 w-full h-[44px] rounded-[10px] dark:bg-[#363952]"
                  type="text"
                  placeholder="Enter Price"
                ></input>
              </div>
            </div>
            <label className="block text-[17px] font-medium mb-4 text-white">
              Description of your Product
            </label>
            <textarea
              className="outline-none p-6 w-full h-[206px] rounded-[20px] mb-12 dark:bg-[#363952]"
              placeholder="Enter a Description"
              data-gramm="false"
              wt-ignore-input="true"
            ></textarea>
            <label
              className="block text-[17px] font-medium mb-4 text-white"
              for="lovation"
            >
              Add your Location
            </label>
            <div className="relative z-20">
              <input
                id="location"
                type="text"
                placeholder="Enter your location"
                className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952]"
              ></input>
            </div>
            <button class="w-full ml-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto">
              Sell the product!
            </button>
          </div>
        </main>
      </main>
    </>
  );
}
