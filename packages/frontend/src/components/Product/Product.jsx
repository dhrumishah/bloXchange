import React, { useState } from "react";
import { useParams } from "react-router-dom";
import contracts from "../../../contracts/hardhat_contracts.json";
import { NETWORK_ID as chainId } from "../../config";
import { getShortAddress, parseError, getImageUrl } from "../../utils";
import { useAccount, useSigner } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { useMemo } from "react";

const Product = (props) => {
  const { address } = useAccount();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const productSeller = props.address;
  const [isLoading, setIsLoading] = useState(false);
  const isSeller = useMemo(() => productSeller === address?.toLowerCase(), [
    address,
    productSeller,
  ]);

  const { data: signer } = useSigner();

  const marketplaceAddress =
    contracts[chainId][0].contracts.EscrowMarketplace.address;
  const marketplaceABI = contracts[chainId][0].contracts.EscrowMarketplace.abi;
  const slicedAddress = getShortAddress(productSeller);

  async function orderItem() {
    setIsLoading(true);
    const id = toast.loading("Ordering product...");
    try {
      const contract = new Contract(marketplaceAddress, marketplaceABI, signer);
      const tx = await contract.orderItem(productId, quantity, {
        value: (props.price * quantity).toString(),
      });
      await tx.wait();
      toast.update(id, {
        render: "Product ordered sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error ordering product!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="flex flex-col max-w-[600px] lg:max-w-[336px]">
        <div className="items-center mb-4">
          <div className="w-full mb-6 ">
            <div className="w-full h-full min-h-[250px]  min-w-[440px] flex items-center rounded-[20px] mb-6 justify-center bg-[#3C3F59] ">
              <img
                className="w-full object-cover object-center min-h-[250px] rounded-[20px] aspect-square h-full"
                src={getImageUrl(props.images[0])}
              ></img>
            </div>
          </div>
          <div className="bg-[#EAEAEA] rounded-[20px] px-6 py-4 min-w-[440px] w-full dark:bg-[#3B3E59]">
            <div className="flex items-center w-full">
              <img src={props.logo} className=" w-[42px] h-[42px] mr-8"></img>
              <div className="flex flex-col w-full mb-2">
                <p className="font-semibold text-white">{props.name}</p>
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
            <p className="text-[20px] text-white font-semibol mb-4">
              {ethers.utils.formatEther(props.price)}
            </p>
            <p className="ml-1 text-[20px] text-[#30cfd0] font-semibol mb-4">
              MATIC
            </p>
          </div>
          <p className="mb-2 font-semibold text-white">Description</p>
          <p className="mb-8 max-w-[450px] text-[#ADB0C9]">
            {props.description}
          </p>
          <p className="mb-2 font-semibold text-white"> Available Quantity</p>
          <p className="mb-8 max-w-[450px] text-[#ADB0C9]">{props.quantity}</p>
          <p className="mb-2 font-semibold text-white">Location</p>
          <p className="mb-8 max-w-[450px] text-[#ADB0C9]">{props.location}</p>
        </div>

        <div className="relative z-20 mt-6">
          <label
            className="block text-[17px] font-medium mb-4 text-white"
            htmlFor="quantity"
          >
            Enter the quantity you want to buy
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min={1}
            max={props.quantity}
            placeholder="Enter product quantity"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952] text-white"
            required
          ></input>
        </div>

        <button
          className="text-[#FFFFFF] rounded-[15px] py-3 px-4 font-bold mb-8 mt-6 hover:opacity-90 bg-[#0073E7] cursor-pointer select-none text-center "
          onClick={orderItem}
          disabled={isSeller || !address || isLoading}
        >
          {isSeller
            ? "You are the seller"
            : isLoading
            ? "Ordering the product..."
            : "Buy this Item!"}
        </button>
      </div>
    </>
  );
};
export default Product;
