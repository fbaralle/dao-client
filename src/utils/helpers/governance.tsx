import { apiClient } from "@/api/client";
import toast from "react-hot-toast";
import { truncateString } from "@/utils";

export const getNetworkData = async () => {
  const { data } = await apiClient.get("/connector/network-data");
  return data;
};

export const parseProposalContent = (content: { [key: string]: any }) => {
  if (
    content?.description?.includes('"title":') &&
    content?.description?.includes('"description":')
  ) {
    const { title, description } = JSON.parse(content?.description);
    return {
      title,
      description,
    };
  }

  return {
    title: `Proposal ${truncateString(content?.proposalId, 10, "middle")}`,
    description: content?.description,
  };
};

export const getProposals = async () => {
  try {
    const { data: proposals } = await apiClient.get("/governance/proposals");
    return proposals;
  } catch {
    toast.error("Error fetching proposals. Try again later");
  }
};

export const getProposalById = async (proposalId: string) => {
  try {
    const { data: proposals } = await apiClient.get(
      `/governance/proposal/${proposalId}`
    );
    return proposals;
  } catch {
    toast.error("Error fetching proposals. Try again later");
  }
};

export const getCurrentValue = async (proposalId: string) => {
  try {
    const { data: value } = await apiClient.get<{ value: string }>(
      "governance/value"
    );
    return value;
  } catch {
    toast.error("Error fetching proposals. Try again later");
  }
};
