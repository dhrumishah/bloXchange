import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Imports
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createClient as createUrqlClient, Provider } from 'urql';


// Get environment variables
const alchemyId = import.meta.env.VITE_ALCHEMY_ID;
const quicknodeId = import.meta.env.VITE_QUICKNODE_ID
const quicknodeUrl = `palpable-polished-pallet.matic-testnet.discover.quiknode.pro/${quicknodeId}`
// const infuraId = import.meta.env.VITE_INFURA_ID;

const hardhatChain = {
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Hardhat',
    symbol: 'HARD',
  },
  network: 'hardhat',
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [jsonRpcProvider({
    rpc: () => ({
      http: `https://${quicknodeUrl}`,
      webSocket: `wss://${quicknodeUrl}`
    }),
    priority: 0
  }), alchemyProvider({ apiKey: alchemyId, priority: 1 }), publicProvider({ priority: 2 })]
);

const { connectors } = getDefaultWallets({
  appName: 'bloXchange',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const urqlClient = createUrqlClient({
  url: 'https://api.thegraph.com/subgraphs/name/pawanpaudel93/bloxchange',
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <Provider value={urqlClient}>
          <App />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
