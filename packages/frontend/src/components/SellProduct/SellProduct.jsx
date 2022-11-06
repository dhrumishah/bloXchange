import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import DropDown from "../DropDown";
import ImageUploader from "../Uploader/ImageUploader";
import contracts from "../../../contracts/hardhat_contracts.json";
import { NETWORK_ID as chainId } from "../../config";
import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa";

let biconomy;
let marketplace;
export default function SellProduct() {
  const [category, setCategory] = useState({});
  const [images, setImages] = React.useState([]);
  const productInit = {
    title: "",
    description: "",
    categoryId: "",
    price: "",
    quantity: 1,
    images: [],
  };
  const [product, setProduct] = useState(productInit);
  const { isConnected, address } = useAccount();

  const marketplaceAddress =
    contracts[chainId][0].contracts.EscrowMarketplace.address;
  const marketplaceABI = contracts[chainId][0].contracts.EscrowMarketplace.abi;

  const biconomyInit = async () => {
    if (!biconomy) {
      biconomy = new Biconomy(window.ethereum, {
        apiKey: import.meta.env.VITE_BICONOMY_API_KEY,
        debug: true,
      });
      marketplace = new ethers.Contract(
        marketplaceAddress,
        marketplaceABI,
        new ethers.providers.Web3Provider(biconomy)
      );
    }
  };

  useEffect(() => {
    if (category?.id) {
      setProduct({ ...product, categoryId: category.id });
    }
  }, [category]);

  useEffect(() => {
    biconomyInit();
  }, [isConnected]);

  async function createProduct() {
    try {
      const provider = await biconomy.getEthersProvider();
      const item = {
        ...product,
        images,
        price: ethers.utils.parseEther(product.price),
      };
      const { data } = await marketplace.populateTransaction.createItem(item);
      let txParams = {
        data: data,
        to: marketplaceAddress,
        from: address,
        signatureType: "EIP712_SIGN",
      };
      const txHash = await provider.send("eth_sendTransaction", [txParams]);
      await provider.waitForTransaction(txHash);
      setProduct(productInit);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="m-auto flex flex-col w-full sm:max-w-[633px]">
        <h1 className="text-[25px] font-semibold mb-10 text-[#30cfd0]">
          Want to sell your product?
        </h1>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="add-title"
        >
          What's the title of your Product?
        </label>
        <div className="relative mb-12">
          <input
            id="add-title"
            type="text"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Enter Product's title"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] text-white"
          ></input>
        </div>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="add-title"
        >
          Select your Product's Category
        </label>
        <div className="mb-12 w-full h-[40px] font-medium" id="add-title">
          <DropDown setCategory={setCategory} isSell />
        </div>
        <div className="relative mb-12">
          <div className="flex flex-col w-full">
            <label
              className="block text-[17px] font-medium mb-4 text-white"
              htmlFor="priceUSD"
            >
              Price (MATIC)
            </label>
            <input
              id="priceUsd"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="outline-none font-medium px-4 py-2 w-full h-[44px] rounded-[10px] dark:bg-[#363952] text-white"
              type="number"
              placeholder="Enter Price"
            ></input>
          </div>
        </div>
        <label className="block text-[17px] font-medium mb-4 text-white">
          Description of your Product
        </label>
        <textarea
          className="outline-none p-6 w-full h-[206px] rounded-[20px] mb-12 dark:bg-[#363952] text-white"
          placeholder="Enter a Description"
          data-gramm="false"
          wt-ignore-input="true"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>
        {/* <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="location"
        >
          Add your Location
        </label>
        <div className="relative z-20">
          <input
            id="location"
            type="text"
            placeholder="Enter your location"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952] text-black"
          ></input>
        </div> */}
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="quantity"
        >
          Quantity
        </label>
        <div className="relative z-20">
          <input
            id="quantity"
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
            min={1}
            placeholder="Enter product quantity"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952] text-white"
          ></input>
        </div>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="images"
        >
          Images
        </label>
        <div className="relative z-20 mb-6">
          <ImageUploader setImageUrls={setImages} imageUrls={images} />
        </div>
        <button
          disabled={!isConnected}
          onClick={createProduct}
          className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto"
        >
          {isConnected ? "Put up for sale!" : "Connect Wallet"}
        </button>
      </div>
    </main>
  );
}
