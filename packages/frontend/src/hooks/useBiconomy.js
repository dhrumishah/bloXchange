import { useEffect } from "react";
import { useAccount } from "wagmi";
import contracts from "../../contracts/hardhat_contracts.json";
import { NETWORK_ID as chainId } from "../config";
import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa";
import { useRef } from "react";

export default function useBiconomy() {
  const biconomy = useRef();
  const marketplace = useRef();
  const { isConnected } = useAccount();

  const marketplaceAddress =
    contracts[chainId][0].contracts.EscrowMarketplace.address;
  const marketplaceABI = contracts[chainId][0].contracts.EscrowMarketplace.abi;

  const biconomyInit = async () => {
    if (!biconomy.current) {
      biconomy.current = new Biconomy(window.ethereum, {
        apiKey: import.meta.env.VITE_BICONOMY_API_KEY,
        debug: true,
      });
      marketplace.current = new ethers.Contract(
        marketplaceAddress,
        marketplaceABI,
        new ethers.providers.Web3Provider(biconomy.current)
      );
    }
  };

  useEffect(() => {
    biconomyInit();
  }, [isConnected]);

  return {
    biconomy: biconomy.current,
    marketplace: marketplace.current,
    marketplaceAddress,
    marketplaceABI
  }
};
