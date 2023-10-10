import { useQuery } from "@tanstack/react-query";
import Text from "../atoms/Text";
import { getProposals } from "@/utils/helpers/governance";
import { Button } from "../atoms/Button";
import ProposalItem from "./ProposalItem";

const ProposalList = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery<any[]>({
    queryKey: ["proposals-list"],
    queryFn: getProposals,
    initialData: [],
    staleTime: 300 * 1000, // 5 minutes,
  });

  return (
    <>
      <div className="flex flex-row mb-4 self-start gap-4 items-center">
        <Button
          onClick={() => {
            refetch();
          }}
          disabled={isLoading || isRefetching}
          className="p-2 px-3 text-sm"
        >
          Refresh List
        </Button>
        {(isLoading || isRefetching) && (
          <Text className="text-gray-400 text-sm">Loading...</Text>
        )}
      </div>
      {data.length &&
        data.map((proposal) => (
          <ProposalItem key={proposal.content.proposalId} {...proposal} />
        ))}
    </>
  );
};

export default ProposalList;
