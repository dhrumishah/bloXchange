import React from "react";
import { getShortAddress } from "../../utils";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useMemo } from "react";
import Logo from "/src/Logo.svg";
import OrderRow from "./OrderRow";

const Order = ({ order }) => {
  const { address } = useAccount();
  const productSeller = order.item.seller;
  const slicedAddress = getShortAddress(productSeller);
  const isSold = useMemo(() => productSeller === address?.toLowerCase(), [
    address,
  ]);

  return (
    <div>
      <div className="grid gap-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 place-items-center">
        <div className="max-w-[443px] lg:max-w-[336px]">
          <div className="items-center mb-4">
            <div className="w-full mb-6 ">
              <div className="w-full h-full min-h-[250px]  min-w-[340px] flex items-center rounded-[20px] mb-6 justify-center bg-[#3C3F59] ">
                <img
                  className="w-full object-cover object-center min-h-[250px] rounded-[20px] aspect-square h-full"
                  src={order.item.images[0]}
                ></img>
              </div>
            </div>
            <div className="bg-[#EAEAEA] rounded-[20px] px-6 py-4 w-full dark:bg-[#3B3E59]">
              <div className="flex items-center w-full">
                <img src={Logo} className=" w-[42px] h-[42px] mr-8"></img>
                <div className="flex flex-col w-full mb-2">
                  <p className="font-semibold text-white">{order.item.name}</p>
                  <p className="text-[13px] font-semibold text-[#46647A] mb-1 dark:text-[#B9CFDF]">
                    {slicedAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mb-4 font-semibold text-white">Category</p>
          <div className="flex space-x-2">
            <a
              className="bg-[#0073E7] font-ssp cursor-pointer rounded-[24px] py-1 px-4 text-[13px] font-semibold text-white"
              href="#"
            >
              {order.item.category.name}
            </a>
          </div>
        </div>
        <div className="w-full max-w-[443px]">
          <div className="bg-[#FFFFFF] rounded-[20px] p-6 w-full mb-4 dark:bg-[#33354B]">
            <div className="grid grid-cols-12">
              <p className="mb-2 text-[18px] col-span-11 font-bold text-[#050505] dark:text-white md:text-[25px]">
                {order.item.title}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-[20px] text-white font-semibol mb-4">
                {ethers.utils.formatEther(order.item.price)}
              </p>
              <p className="ml-1 text-[20px] text-[#30cfd0] font-semibol mb-4">
                MATIC
              </p>
            </div>
            <p className="mb-2 font-semibold text-white">Description</p>
            <p className="mb-8 max-w-[450px] text-[#ADB0C9]">
              {order.item.description}
            </p>
            <p className="mb-2 font-semibold text-white">Quantity</p>
            <p className="mb-8 max-w-[450px] text-[#ADB0C9]">
              {order.item.quantity}
            </p>
            <p className="mb-2 font-semibold text-white">Location</p>
            <p className="mb-8 max-w-[450px] text-[#ADB0C9]">
              {order.item.location}
            </p>
          </div>
        </div>
      </div>
      {/* place this table element below this */}
      <div className="w-full">
        <table>
          <tbody>
            <OrderRow order={order} isSold={isSold} />
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Order;
