import React from "react";
import ReactDOM from "react-dom";

export default function DropDown() {
  return (
    <select className="rounded-md h-8 w-60 bg-slate-400 text-black cursor-pointer opacity-4">
      <option className="text-black">Electronics</option>
      <option className="text-black">Furniture</option>
      <option selected className="text-black">
        Jewelry
      </option>
      <option className="text-black">Real Estate</option>
    </select>
  );
}
