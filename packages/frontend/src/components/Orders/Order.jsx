import React from "react";
import {
  getShortAddress,
  ORDER_STATUS,
  parseError,
  getImageUrl,
} from "../../utils";
import useBiconomy from "../../hooks/useBiconomy";
import { useAccount, useSigner } from "wagmi";
import { ethers, Contract } from "ethers";
import { toast } from "react-toastify";
import Logo from "/src/Logo.svg";
import OrderRow from "./OrderRow";
import Thead from "./Table/Thead";

const Order = ({ order, refetchOrder }) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const productSeller = order.item.seller;
  const productBuyer = order.buyer;
  const status = order.status;
  const slicedAddress = getShortAddress(productSeller);
  const isSeller = productSeller === address?.toLowerCase();
  const isBuyer = productBuyer === address?.toLowerCase();
  const {
    biconomy,
    marketplace,
    marketplaceAddress,
    marketplaceABI,
  } = useBiconomy();

  const performShipping = async () => {
    const id = toast.loading("Performing shipping...");
    try {
      const provider = await biconomy.getEthersProvider();
      const { data } = await marketplace.populateTransaction.performShipping(
        order.id
      );
      let txParams = {
        data: data,
        to: marketplaceAddress,
        from: address,
        signatureType: "EIP712_SIGN",
      };
      const txHash = await provider.send("eth_sendTransaction", [txParams]);
      await provider.waitForTransaction(txHash);
      refetchOrder();
      toast.update(id, {
        render: "Order shipped sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error shipping order!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const confirmDelivery = async () => {
    const id = toast.loading("Confirming order delivery...");
    try {
      const provider = await biconomy.getEthersProvider();
      const { data } = await marketplace.populateTransaction.confirmDelivery(
        order.id
      );
      let txParams = {
        data: data,
        to: marketplaceAddress,
        from: address,
        signatureType: "EIP712_SIGN",
      };
      const txHash = await provider.send("eth_sendTransaction", [txParams]);
      await provider.waitForTransaction(txHash);
      refetchOrder();
      toast.update(id, {
        render: "Order delivery confirmed sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error confirming delivery of order!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const disputeOrder = async () => {
    const id = toast.loading("Disputing order...");
    try {
      const contract = new Contract(marketplaceAddress, marketplaceABI, signer);
      const arbitratorFeePercent = await contract.arbitratorFee();
      const arbitratorFee = arbitratorFeePercent.mul(order.amount).div(100);
      const tx = await contract.disputeOrder(order.id, {
        value: arbitratorFee,
      });
      await tx.wait();
      refetchOrder();
      toast.update(id, {
        render: "Order disputed sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error disputing order!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div>
      <div className="grid gap-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 place-items-center">
        <div className="max-w-[443px] lg:max-w-[336px]">
          <div className="items-center mb-4">
            <div className="w-full mb-6 ">
              <div className="w-full h-full min-h-[250px]  min-w-[340px] flex items-center rounded-[20px] mb-6 justify-center bg-[#3C3F59] ">
                <img
                  className="w-full object-cover object-center min-h-[250px] rounded-[20px] aspect-square h-full"
                  src={getImageUrl(order.item.images[0])}
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
      <div className="w-full mt-5">
        <table>
          <Thead isSeller={isSeller} isBuyer={isBuyer} />
          <tbody>
            <OrderRow order={order} userAddress={address} />
          </tbody>
        </table>
        <div className="mt-5 text-center">
          {isSeller && status === ORDER_STATUS.PENDING && (
            <button
              onClick={performShipping}
              className="text-[#FFFFFF] rounded-[15px] py-3 px-4 mx-2 font-bold mb-8 hover:opacity-90 bg-[#0073E7] cursor-pointer select-none text-center "
            >
              Perform Shipping
            </button>
          )}
          {isBuyer && status === ORDER_STATUS.SHIPPED && (
            <button
              onClick={confirmDelivery}
              className="text-[#FFFFFF] rounded-[15px] py-3 px-4 mx-2 font-bold mb-8 hover:opacity-90 bg-green-600 cursor-pointer select-none text-center "
            >
              Confirm Delivery
            </button>
          )}
          {(isSeller || isBuyer) &&
            status !== ORDER_STATUS.DELIVERED &&
            status !== ORDER_STATUS.REFUNDED && (
              <button
                onClick={disputeOrder}
                disabled={status === ORDER_STATUS.DISPUTTED}
                className="text-[#FFFFFF] rounded-[15px] py-3 px-4 mx-2 font-bold mb-8 hover:opacity-90 bg-red-600 cursor-pointer select-none text-center "
              >
                {status === ORDER_STATUS.DISPUTTED
                  ? "Order Disputed"
                  : "Dispute Order"}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
export default Order;
