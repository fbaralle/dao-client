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
  estimated_gas: string;
}

const useContractActions = () => {
  const { client, publicClient, userAddress, chainStats } = useUserWallet();

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

    const signedTxHash = await client.sendTransaction(request);

    await publicClient.waitForTransactionReceipt({ hash: signedTxHash });

    return signedTxHash;
  };

  const getBuildVoteProposalTx = async (
    proposalId: string,
    voteWay: VoteWay
  ) => {
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

    const signedTxHash = await client.sendTransaction(request);

    await publicClient.waitForTransactionReceipt({ hash: signedTxHash });

    return signedTxHash;
  };

  const getBuildQueueProposalTx = async (proposalId: string) => {
    const { data } = await apiClient.post<BuildProposalTxResponse>(
      "/governance/build-tx/queue",
      {
        proposalId,
      }
    );

    const parsedTx = ethers.utils.parseTransaction(data.unsigned_tx);

    const request = await client.prepareTransactionRequest({
      account: userAddress,
      to: parsedTx.to as Address,
      value: BigInt("0"),
      data: parsedTx.data as `0x${string}`,
      gasPrice: BigInt(chainStats.gasPrice),
      gas: BigInt(data.estimated_gas),
    });

    const signedTxHash = await client.sendTransaction(request);

    await publicClient.waitForTransactionReceipt({ hash: signedTxHash });

    return signedTxHash;
  };

  const getBuildExecuteProposalTx = async (proposalId: string) => {
    const { data } = await apiClient.post<BuildProposalTxResponse>(
      "/governance/build-tx/execute",
      {
        proposalId,
      }
    );

    const parsedTx = ethers.utils.parseTransaction(data.unsigned_tx);

    const request = await client.prepareTransactionRequest({
      account: userAddress,
      to: parsedTx.to as Address,
      value: BigInt("0"),
      data: parsedTx.data as `0x${string}`,
      gasPrice: BigInt(chainStats.gasPrice),
      gas: data.estimated_gas ? BigInt(data.estimated_gas) : undefined,
      maxFeePerGas: undefined,
    });

    const signedTxHash = await client.sendTransaction(request);

    await publicClient.waitForTransactionReceipt({ hash: signedTxHash });

    return signedTxHash;
  };

  return {
    getBuildProposalTx,
    getBuildVoteProposalTx,
    getBuildQueueProposalTx,
    getBuildExecuteProposalTx,
  };
};

export default useContractActions;
