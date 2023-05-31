import type { AppProps } from "next/app";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import {metaMaskWallet, omniWallet, rainbowWallet, walletConnectWallet} from "@rainbow-me/rainbowkit/wallets"
import {ToastContainer} from "react-toastify";
import { Valora, CeloWallet } from "@celo/rainbowkit-celo/wallets";

const projectId = "celo-composer-project-id" // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [Alfajores, Celo],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }) })]
);

// Create list of wallet to connect to
const connectors = connectorsForWallets([
  {
    groupName: "Recommended with Celo",
    wallets: [
      Valora({projectId, chains}),
      CeloWallet({projectId, chains}),
      metaMaskWallet({projectId, chains}),
      rainbowWallet({projectId, chains}),
      omniWallet({chains}),
      walletConnectWallet({chains})
    ]
  }
  
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode={true}>
        <ToastContainer position="bottom-center" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App;