import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import DropDown from "../DropDown";
import ImageUploader from "../Uploader/ImageUploader";
import { ethers } from "ethers";
import useBiconomy from "../../hooks/useBiconomy";
import { toast } from "react-toastify";
import { parseError } from "../../utils";

export default function SellProduct() {
  const [category, setCategory] = useState({});
  const [images, setImages] = React.useState([]);
  const { biconomy, marketplace } = useBiconomy();
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (category?.id) {
      setProduct({ ...product, categoryId: category.id });
    }
  }, [category]);

  async function createProduct(e) {
    e.preventDefault();
    if (images.length > 0) {
      const id = toast.loading("Creating product...");
      try {
        setIsLoading(true);
        const provider = await biconomy.getEthersProvider();
        const item = {
          ...product,
          images,
          price: ethers.utils.parseEther(product.price),
        };
        const { data } = await marketplace.populateTransaction.createItem(item);
        let txParams = {
          data: data,
          to: marketplace.address,
          from: address,
          signatureType: "EIP712_SIGN",
        };
        const txHash = await provider.send("eth_sendTransaction", [txParams]);
        await provider.waitForTransaction(txHash);
        setProduct(productInit);
        toast.update(id, {
          render: "Product created sucessfully",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } catch (e) {
        toast.update(id, {
          render: parseError(e, "Error creating product!!!"),
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } else {
      toast.error("No images uploaded!!!");
    }
    setIsLoading(false);
  }

  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <form
        onSubmit={createProduct}
        className="m-auto flex flex-col w-full sm:max-w-[633px]"
      >
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
            required
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
              required
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
          required
        ></textarea>
        <label
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
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952] text-white"
          ></input>
        </div>
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
            required
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
          disabled={!isConnected || isLoading}
          type="submit"
          className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto"
        >
          {isLoading ? "Creating Product..." : "Put up for sale!"}
        </button>
      </form>
    </main>
  );
}
