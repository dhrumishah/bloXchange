import React, { useState } from "react";
import DropDown from "../DropDown";
import "./marketplace.css";
import Magnify from "./../svg/magnifying-glass.svg";
import Items from "../Item/Items";


export default function iMarketPlace() {
  const [category, setCategory] = useState({ id: "0x-1", name: "All" })
  return (
    <main className="mt-[80px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="flex flex-col w-full">
        <div className="flex ml-auto items-center mb-8">
          <img src={Magnify}></img>
          <p className="ml-auto mr-4 text-[18px] text-[#51515F] dark:text-[#C9C9E7] font-medium">
            Category
          </p>
          <div className="relative">
            <button className="outline-none flex items-center hover:opacity-90">
              <p className="text-[#51515F] text-[18px] mr-2 font-semibold dark:text-white">
                <DropDown setCategory={setCategory} />
              </p>
            </button>
          </div>
        </div>
        <Items categoryId={category.id} />
      </div>
    </main>
  );
}
