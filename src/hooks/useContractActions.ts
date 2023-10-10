import { apiClient } from "@/api/client";
import { useUserWallet } from "@/context/wallet-data.context";
import * as ethers from "ethers";
import { Address } from "viem";

// 0 = Against, 1 = For, 2 = Abstain for this example
export enum VoteWay {
  AGAINST,
  FOR,
  ABSTAIN,
}

export interface Proposal {
  title: string;
  description: string;
  newValue: number;
}

export interface BuildProposalTxResponse {
  unsigned_tx: string;
  is_serialized: boolean;
}

const useContractActions = () => {
  const { client, userAddress, chainStats } = useUserWallet();

  const getBuildProposalTx = async (proposal: Proposal) => {
    const { data } = await apiClient.post<BuildProposalTxResponse>(
      "/governance/build-tx/proposal",
      proposal
    );

    const parsedTx = ethers.utils.parseTransaction(data.unsigned_tx);

    const request = await client.prepareTransactionRequest({
      account: userAddress,
      to: parsedTx.to as Address,
      value: BigInt("0"),
      data: parsedTx.data as `0x${string}`,
      gasPrice: BigInt(chainStats.gasPrice),
    });

    const signedTxReceipt = await client.sendTransaction(request);

    return signedTxReceipt;
  };

  const getBuildVoteProposalTx = async (
    proposalId: string,
    voteWay: VoteWay
  ) => {
    console.log("vote", {
      proposalId,
      voteWay,
    });

    const { data } = await apiClient.post<BuildProposalTxResponse>(
      "/governance/build-tx/vote",
      {
        proposalId,
        voteWay,
      }
    );

    const parsedTx = ethers.utils.parseTransaction(data.unsigned_tx);

    const request = await client.prepareTransactionRequest({
      account: userAddress,
      to: parsedTx.to as Address,
      value: BigInt("0"),
      data: parsedTx.data as `0x${string}`,
      gasPrice: BigInt(chainStats.gasPrice),
    });

    const signedTxReceipt = await client.sendTransaction(request);

    return signedTxReceipt;
  };

  return {
    getBuildProposalTx,
    getBuildVoteProposalTx,
  };
};

export default useContractActions;
