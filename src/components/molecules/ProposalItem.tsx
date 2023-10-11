import {
  getProposalById,
  parseProposalContent,
} from "@/utils/helpers/governance";
import Text from "../atoms/Text";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faChevronDown,
  faChevronUp,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import useContractActions, { VoteWay } from "@/hooks/useContractActions";
import { Button } from "../atoms/Button";
import toast from "react-hot-toast";
import { truncateString } from "@/utils";
import { useUserWallet } from "@/context/wallet-data.context";
import LoadingSpinner from "../atoms/LoadingSpinner";
import { twMerge } from "tailwind-merge";

export interface ProposalItemProps {
  content: { proposalId: string; [key: string]: any };
  [key: string]: any;
}

const ProposalItem: React.FC<ProposalItemProps> = (data) => {
  const [expanded, setExpanded] = useState(false);
  const { userAddress } = useUserWallet();
  const { getBuildVoteProposalTx } = useContractActions();
  const [submitting, setSubmitting] = useState<false | VoteWay>(false);
  const {
    data: proposalDetails,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [`proposal-${data.content.proposalId}`],
    queryFn: () => getProposalById(data.content.proposalId),
    staleTime: 10 * 60 * 1000,
    enabled: expanded,
  });
  const { title, description } = parseProposalContent(data.content);

  const handleVote = async (e: any, voteWay: VoteWay) => {
    e.preventDefault();

    setSubmitting(voteWay);
    try {
      await getBuildVoteProposalTx(data.content.proposalId, voteWay);

      toast.success(
        `Successfully voted Proposal with ID:${truncateString(
          data.content.proposalId,
          10,
          "middle"
        )}`
      );
    } catch (e) {
      // toast.error("Submit error");
    } finally {
      setSubmitting(false);
    }
  };

  const blockDeadline = proposalDetails?.blockDeadline ?? "--";
  const status = proposalDetails?.stateName ?? "--";
  const forVotes = proposalDetails?.proposalVotes?.forVotes ?? "--";
  const againstVotes = proposalDetails?.proposalVotes?.againstVotes ?? "--";

  return (
    <div className="flex flex-col w-full p-4 px-6 bg-background-popout rounded-lg hover:bg-background-highlight mb-4 cursor-pointer">
      <div
        className="flex flex-row mb-4  justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <Text variant="h4" className="text-text-default">
          {title}
        </Text>
        <FontAwesomeIcon
          icon={expanded ? faChevronUp : faChevronDown}
          size="sm"
          className={`text-gray-400`}
        />
      </div>
      <Text variant="p" className="text-text-subdued">
        {description}
      </Text>
      {expanded && (
        <div className="mt-4 p-4 bg-gray-900 flex flex-col rounded text-gray-400 gap-2">
          {
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4 border-b-[1px] text-gray-400 border-gray-500 pb-2 items-center">
                <Text className="text-sm">{`Status: ${status.toUpperCase()}`}</Text>
                <Text className="text-sm">{`Block Voting Deadline: ${blockDeadline}`}</Text>
                <Button
                  className="border-0 bg-gray-800 rounded-full py-1 px-2 ml-auto"
                  onClick={() => refetch()}
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      size="sm"
                      className={twMerge(
                        "text-gray-400",
                        isRefetching && "animate-spin"
                      )}
                    />
                  </div>
                  Refresh
                </Button>
              </div>
              {isLoading ? (
                <div className="flex flex-row gap-4">
                  <Text className="text-sm">Loading proposal stats...</Text>
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <Text className="text-sm">Votes For</Text>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="sm"
                        className={`text-green-300`}
                      />
                      <Text className="text-sm">{forVotes}</Text>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Text className="text-sm">Votes Against</Text>
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        size="sm"
                        className={`text-gray-400`}
                      />
                      <Text className="text-sm">{againstVotes}</Text>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Button
                      className="text-sm rounded-full text-center"
                      onClick={(e) => handleVote(e, VoteWay.FOR)}
                      disabled={!userAddress || !!submitting}
                    >
                      {submitting === VoteWay.FOR ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          <Text className="text-sm">Vote For</Text>
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            size="sm"
                            className={`text-green-300`}
                          />
                        </>
                      )}
                    </Button>
                    <Button
                      className="text-sm rounded-full text-center py-1"
                      onClick={(e) => {
                        const truncatedTitle = truncateString(title, 30, "end");
                        toast.promise(handleVote(e, VoteWay.ABSTAIN), {
                          loading: `Submitting votes to Proposal: ${truncatedTitle}`,
                          success: `Successfully voted on Proposal ID:${truncatedTitle}`,
                          error:
                            "Error while trying to submit votes. Try again later",
                        });
                        handleVote(e, VoteWay.ABSTAIN);
                      }}
                      disabled={!userAddress || !!submitting}
                    >
                      {submitting === VoteWay.AGAINST ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          <Text className="text-sm">Vote Against</Text>
                          <FontAwesomeIcon
                            icon={faThumbsDown}
                            size="sm"
                            className={`text-gray-400`}
                          />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ProposalItem;
