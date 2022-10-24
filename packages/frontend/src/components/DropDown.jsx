import React from "react";
import ReactDOM from "react-dom";

export default function DropDown() {
  return (
    <select className="rounded-md h-8 w-60 bg-slate-400 text-black">
      <option value="grapefruit" className="text-black">
        Electronics
      </option>
      <option value="lime" className="text-black">
        Furniture
      </option>
      <option selected value="coconut" className="text-black">
        Jewelry
      </option>
      <option value="mango" className="text-black">
        Reat Estate
      </option>
    </select>
  );
}
