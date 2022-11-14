import React, { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { parseError } from "../../utils";
import useBiconomy from "../../hooks/useBiconomy";

const Admin = () => {
  const { address, isConnected } = useAccount();
  const [categories, setCategories] = useState("");
  const { marketplace, biconomy } = useBiconomy();
  const [isLoading, setIsLoading] = useState(false);

  const addCategories = async (e) => {
    e.preventDefault();
    const id = toast.loading("Adding categories...");
    try {
      setIsLoading(true);
      const provider = await biconomy.getEthersProvider();
      const _categories = categories
        .split(",")
        .map((category) => ethers.utils.formatBytes32String(category.trim()));
      const { data } = await marketplace.populateTransaction.addCategories(
        _categories
      );
      let txParams = {
        data: data,
        to: marketplace.address,
        from: address,
        signatureType: "EIP712_SIGN",
      };
      const txHash = await provider.send("eth_sendTransaction", [txParams]);
      await provider.waitForTransaction(txHash);
      toast.update(id, {
        render: "Categories added sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error adding categories!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const removeCategories = async () => {
    e.preventDefault();
    const id = toast.loading("Removing categories...");
    try {
      setIsLoading(true);
      const provider = await biconomy.getEthersProvider();
      const _categories = categories
        .split(",")
        .map((category) => ethers.utils.formatBytes32String(category.trim()));
      const { data } = await marketplace.populateTransaction.removeCategories(
        _categories
      );
      let txParams = {
        data: data,
        to: marketplace.address,
        from: address,
        signatureType: "EIP712_SIGN",
      };
      const txHash = await provider.send("eth_sendTransaction", [txParams]);
      await provider.waitForTransaction(txHash);
      toast.update(id, {
        render: "Categories removed sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error removing categories!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <main className="mt-[60px] py-12 px-4 relative min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 place-items-center">
        <form onSubmit={addCategories} className="m-auto flex flex-col w-full">
          <label
            className="block text-[17px] font-medium mb-4 text-white"
            htmlFor="add-title"
          >
            Add categories seperated by commas
          </label>
          <div className="relative mb-12">
            <input
              id="add-title"
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Add categories seperated by commas"
              className="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] text-white"
              required
            ></input>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto"
          >
            {isLoading ? "Adding categories..." : "Add categories"}
          </button>
        </form>

        <form
          onSubmit={removeCategories}
          className="m-auto flex flex-col w-full"
        >
          <label
            className="block text-[17px] font-medium mb-4 text-white"
            htmlFor="add-title"
          >
            Remove categories seperated by commas
          </label>
          <div className="relative mb-12">
            <input
              id="add-title"
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Add categories seperated by commas"
              className="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] text-white"
              required
            ></input>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto"
          >
            {isLoading ? "Removing categories..." : "Remove categories"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Admin;
