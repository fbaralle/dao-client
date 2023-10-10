import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { mainnet, sepolia, localhost } from "wagmi/chains";

const projectId = "010939ee31b2dfee44a3d0e5a971a6de";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Connector",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, sepolia, localhost];

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
export const createWagmiWeb3Modal = () =>
  createWeb3Modal({ wagmiConfig, projectId, chains });
