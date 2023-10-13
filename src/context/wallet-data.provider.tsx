import { useCallback, useMemo, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  selectedWalletDataDefaultState,
  WalletContext,
  WalletData,
} from "./wallet-data.context";
import { createWalletClient, createPublicClient, custom, Chain } from "viem";
import { sepolia, mainnet, localhost, hardhat } from "viem/chains";
import toast from "react-hot-toast";
import { getNetworkData } from "@/utils/helpers/governance";

const enabledChains: { [key: string]: Chain } = {
  sepolia,
  mainnet,
  localhost,
  hardhat,
};

const chain = process.env.NEXT_PUBLIC_NETWORK || "sepolia";

const WalletProvider: React.FC<{ children: ReactNode; [key: string]: any }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [selectedWalletData, setSelectedWalletData] = useState<any>({
    client: undefined,
    publicClient: undefined,
    address: undefined,
    balance: 0,
  });

  const { data: chainStats, isLoading: isLoadingChainStats } = useQuery<any[]>({
    queryKey: ["network-data", hasMetamask],
    queryFn: getNetworkData,
    staleTime: 1000, // 1 min
    initialData: {
      chainId: undefined,
      gasPrice: "100000000",
      currentBlock: null,
    },
    refetchInterval: (data: any) =>
      !!data?.chainId ? 5 * 60 * 1000 : 5 * 1000, // 1 min
  });

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        console.log("Connecting to chain", { chain });
        if (chain === "hardhat") {
          await (window.ethereum as any).request({
            method: "wallet_addEthereumChain",
            params: [
              {
                blockExplorerUrls: ["http://localhost:3000"],
                iconUrls: [],
                rpcUrls: ["http://127.0.0.1:8545"],
                chainId: "0x7A69",
                chainName: "Hardhat",
                nativeCurrency: {
                  name: "testEther",
                  symbol: "tETH",
                  decimals: 18,
                },
              },
            ],
          });
        }

        const [account] = await (window.ethereum as any).request({
          method: "eth_requestAccounts",
        });

        const client = createWalletClient({
          account,
          chain: enabledChains[chain],
          transport: custom(window.ethereum as any),
        });

        const publicClient = createPublicClient({
          chain: enabledChains[chain],
          transport: custom(window.ethereum as any),
        });
        const [address] = await client.requestAddresses();
        const balance = await publicClient.getBalance({
          address,
        });
        setSelectedWalletData({
          client,
          publicClient,
          userAddress: address,
          balance,
        });
        console.log("Client connected", client);
      } catch (e) {
        toast.error("Wallet connect error");
      }
    } else {
      setIsConnected(false);
    }
  }, []);

  const resetWallet = useCallback(() => {
    setSelectedWalletData(selectedWalletDataDefaultState);
  }, []);

  // Unlike a typical React setState, this automatically merges the new data with the old, so you only need to supply partial state
  const updateSelectedWallet = useCallback(
    (value: any) =>
      setSelectedWalletData((prev: any) => {
        const next = typeof value === "function" ? value(prev) : value;
        return { ...prev, ...next };
      }),
    []
  );

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  useEffect(() => {
    // if (hasMetamask && !isConnected) connectWallet();
  }, [hasMetamask]);

  const value: WalletData = useMemo(
    () => ({
      ...selectedWalletData,
      isLoadingWallet: isLoading,
      chainStats,
      isLoadingChainStats,
      resetWallet,
      updateSelectedWallet,
      setIsLoadingWallet: setIsLoading,
      setSelectedWalletData,
      connectWallet,
    }),
    [
      selectedWalletData,
      chainStats,
      isLoading,
      isLoadingChainStats,
      resetWallet,
      updateSelectedWallet,
      connectWallet,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
