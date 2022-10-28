import React from "react";
import ReactDOM from "react-dom";

export default function DropDown() {
  return (
    <select className="rounded-md h-8 w-60 dark:bg-[#363952] text-white cursor-pointer opacity-4">
      <option className="text-white">Electronics</option>
      <option className="text-white">Furniture</option>
      <option selected className="text-white">
        Jewelry
      </option>
      <option className="text-white">Real Estate</option>
    </select>
  );
}
