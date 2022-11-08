import React, { useState } from "react";
import { useParams } from "react-router-dom";
import contracts from "../../../contracts/hardhat_contracts.json";
import { NETWORK_ID as chainId } from "../../config";
import { useAccount, useSigner, useContract, useProvider } from "wagmi";
import { ethers } from "ethers";
import { Contract } from "ethers";

const Product = (props) => {
  const { address } = useAccount();
  const { productId } = useParams();
  const orderInitial = {
    itemId: 1,
    quantity: 1,
  };

  const [order, setOrder] = useState(orderInitial);
  const [buttonText, setButtonText] = useState("Buy this Item!");

  const { data: signer } = useSigner();

  const marketplaceAddress =
    contracts[chainId][0].contracts.EscrowMarketplace.address;
  const marketplaceABI = contracts[chainId][0].contracts.EscrowMarketplace.abi;
  const productSeller = props.address;
  const slicedAddress =
    productSeller.slice(0, 3) + "..." + productSeller.slice(-4);

  async function orderItem() {
    try {
      if (productSeller === address) {
        console.log("You can't buy");
        return;
      }
      const contract = new Contract(marketplaceAddress, marketplaceABI, signer);
      console.log("starting");
      const tx = await contract.orderItem(productId, 1, {
        gasLimit: 5000000,
        value: ethers.utils.parseEther(props.price.toString()),
      });
      await tx.wait();
      console.log("started");
      setOrder(orderInitial);
      setButtonText("You have already bought this item!");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="flex flex-col max-w-[443px] lg:max-w-[336px]">
        <div className="items-center mb-4">
          <div className="w-full mb-6 ">
            <div className="w-full h-full min-h-[250px]  min-w-[340px] flex items-center rounded-[20px] mb-6 justify-center bg-[#3C3F59] ">
              <img
                className="w-full object-cover object-center min-h-[250px] rounded-[20px] aspect-square h-full"
                src={props.images[0]}
              ></img>
            </div>
          </div>
          <div className="bg-[#EAEAEA] rounded-[20px] px-6 py-4 w-full dark:bg-[#3B3E59]">
            <div className="flex items-center w-full">
              <img src={props.logo} className=" w-[42px] h-[42px] mr-8"></img>
              <div className="flex flex-col w-full mb-2">
                <p className="font-semibold text-white">{props.name}</p>
                <p className="text-[13px] font-semibold text-[#46647A] mb-1 dark:text-[#B9CFDF]">
                  {productSeller}
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
            {props.category}
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[443px]">
        <div className="bg-[#FFFFFF] rounded-[20px] p-6 w-full mb-4 dark:bg-[#33354B]">
          <div className="grid grid-cols-12">
            <p className="mb-2 text-[18px] col-span-11 font-bold text-[#050505] dark:text-white md:text-[25px]">
              {props.title}
            </p>
          </div>
          <div className="flex flex-row">
            <p className="text-[20px] text-black font-semibol mb-4">
              {props.price}
            </p>
            <p className="ml-1 text-[20px] text-[#30cfd0] font-semibol mb-4">
              MATIC
            </p>
          </div>
          <p className="mb-2 font-semibold text-white">Description</p>
          <p className="mb-8 max-w-[450px] text-[#ADB0C9]">
            {props.description}
          </p>
          <p className="mb-2 font-semibold text-white">Location</p>
          <p className="mb-8 max-w-[450px] text-[#ADB0C9]">{props.location}</p>
        </div>
        <button
          className="text-[#FFFFFF] rounded-[15px] py-3 px-4 font-bold mb-8 hover:opacity-90 bg-[#0073E7]  cursor-pointer select-none text-center "
          onClick={orderItem}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};
export default Product;
