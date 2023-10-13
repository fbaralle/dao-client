import { createContext, Dispatch, SetStateAction, useContext } from "react";
import {
  Account,
  Address,
  Chain,
  ParseAccount,
  PublicClient,
  Transport,
  WalletClient,
} from "viem";

export interface WalletData {
  client: WalletClient<
    Transport,
    Chain,
    ParseAccount<Account | Address | undefined>
  >;
  publicClient: PublicClient<Transport, Chain>;
  userAddress: Address;
  balance: string | number | bigint;
  isLoadingWallet: boolean;
  isLoadingChainStats: boolean;
  chainStats: { [key: string]: any };
  setIsLoadingWallet: Dispatch<SetStateAction<boolean>>;
  setSelectedWalletData: Dispatch<SetStateAction<any>>;
  resetWallet: () => void;
  updateSelectedWallet: (_newWalletData: any) => void;
  connectWallet: () => void;
}

const selectedWalletDataDefaultState: any = {
  client: undefined,
  userAddress: "",
};

const walletContextDefaultValues: WalletData = {
  ...selectedWalletDataDefaultState,
};

const WalletContext = createContext<WalletData>(walletContextDefaultValues);

const useUserWallet = () => {
  return useContext(WalletContext);
};

export {
  selectedWalletDataDefaultState,
  walletContextDefaultValues,
  WalletContext,
  useUserWallet,
};
