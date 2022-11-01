import React from "react";

const Product = (props) => {
  return (
    <div className="items-center mb-4">
      <div className="w-full mb-6 ">
        <div className="w-full h-full min-h-[250px]  min-w-[340px] flex items-center rounded-[20px] mb-6 justify-center bg-[#3C3F59] ">
          <img
            className="w-full object-cover object-center min-h-[250px] rounded-[20px] aspect-square h-full"
            src={props.image}
          ></img>
        </div>
      </div>
      <div className="bg-[#EAEAEA] rounded-[20px] px-6 py-4 w-full dark:bg-[#3B3E59]">
        <div className="flex items-center w-full">
          <img src={props.logo} className=" w-[42px] h-[42px] mr-4"></img>
          <div className="flex flex-col w-full mb-2">
            <p className="font-semibold text-white">Aditya Gupta</p>
            <p className="text-[13px] font-semibold text-[#46647A] mb-1 dark:text-[#B9CFDF]">
              0xCb47b8894aA8fBD112888565f39461B8Ba03Ba5c
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
