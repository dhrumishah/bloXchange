import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import Logo from "/src/Logo.svg";
import { ITEM_QUERY } from "../../queries";
import { useQuery } from "urql";
import { useAccount } from "wagmi";
import contracts from "../../../contracts/hardhat_contracts.json";
import { Biconomy } from "@biconomy/mexa";
import { NETWORK_ID as chainId } from "../../config";

let marketplace;

function ProductWrapper() {

  const { productId } = useParams()
  const [result] = useQuery({
    query: ITEM_QUERY,
    variables: {
      id: productId
    }
  })

  const { data, fetching, error } = result;
  

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

  const product = data.item;
  console.log(product + "product");
    const marketplaceAddress = contracts[chainId][0].contracts.EscrowMarketplace.address;
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
    }

    // useEffect(() => {
    //   biconomyInit()
    // }, [isConnected])
  

  return <Product
    id={productId}
    images={product.images}
    logo={Logo}
    name={product.name}
    address={product.seller}
    category={product.category.name}
    title={product.title}
    price={product.price / 10 ** 18}
    description={product.description}
    location={product.location}
    
  />
}

export default function ProductDetails() {
  return (
    <main className="mt-[80px] py-12 px-4 relative flex flex-col min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="relative mx-auto grid grid-cols-1 mt-14 sm:mt-0 gap-8 lg:flex lg:justify-center">
        <ProductWrapper />
      </div>
    </main>
  );
}
