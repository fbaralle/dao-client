import {
  getProposalById,
  parseProposalContent,
} from "@/utils/helpers/governance";
import Text from "../atoms/Text";
import { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faChevronDown,
  faChevronUp,
  faHourglass3,
  faRocket,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import useContractActions, { VoteWay } from "@/hooks/useContractActions";
import { Button } from "../atoms/Button";
import toast from "react-hot-toast";
import { formatTokenValue, truncateString } from "@/utils";
import { useUserWallet } from "@/context/wallet-data.context";
import LoadingSpinner from "../atoms/LoadingSpinner";
import { twMerge } from "tailwind-merge";
import StatusPill, { ProposalState } from "../organisms/StatusPill";
import moment from "moment";

const SECONDS_PER_BLOCK = 15;

export const remainingDuration = (currentBlock: number, deadline: number) => {
  const secondsRemaining = (currentBlock - deadline) * SECONDS_PER_BLOCK;
  return moment.duration(secondsRemaining, "seconds").humanize();
};

export interface ProposalItemProps {
  content: { proposalId: string; [key: string]: any };
  [key: string]: any;
}

const ProposalItem: React.FC<ProposalItemProps> = (data) => {
  const [expanded, setExpanded] = useState(false);
  const { userAddress, chainStats } = useUserWallet();
  const {
    getBuildVoteProposalTx,
    getBuildQueueProposalTx,
    getBuildExecuteProposalTx,
  } = useContractActions();
  const [submitting, setSubmitting] = useState<boolean | VoteWay>(false);
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

  const handleVote = useCallback(
    async (e: any, voteWay: VoteWay) => {
      e.preventDefault();

      setSubmitting(voteWay);
      await getBuildVoteProposalTx(data.content.proposalId, voteWay);
      setSubmitting(false);
      refetch();
    },
    [getBuildVoteProposalTx, data, refetch]
  );

  const handleQueueProposal = useCallback(
    async (e: any) => {
      e.preventDefault();

      setSubmitting(true);
      await getBuildQueueProposalTx(data.content.proposalId);
      setSubmitting(false);
      refetch();
    },
    [getBuildQueueProposalTx, data, refetch]
  );

  const handleExecuteProposal = useCallback(
    async (e: any) => {
      e.preventDefault();

      setSubmitting(true);
      await getBuildExecuteProposalTx(data.content.proposalId);
      setSubmitting(false);
      refetch();
    },
    [getBuildExecuteProposalTx, data, refetch]
  );

  const executionEtaTime =
    proposalDetails?.executionEta &&
    moment.unix(Number(proposalDetails?.executionEta));
  const executionEtaLabel =
    proposalDetails?.executionEta && moment().to(executionEtaTime);
  const blockDeadline = proposalDetails?.blockDeadline ?? "--";
  const votingPeriodRemaining =
    typeof blockDeadline === "number"
      ? remainingDuration(chainStats.currentBlock, blockDeadline)
      : undefined;
  const proposalStatus = proposalDetails?.state;
  const statusName = proposalDetails?.stateName ?? "--";
  const forVotes = formatTokenValue(proposalDetails?.proposalVotes?.forVotes);
  const againstVotes = formatTokenValue(
    proposalDetails?.proposalVotes?.againstVotes
  );

  const votingPeriodExpired = ![
    ProposalState.Pending,
    ProposalState.Active,
  ].includes(proposalStatus);
  const votingPeriodActive = proposalStatus === ProposalState.Active;
  const votingPeriodPending = proposalStatus === ProposalState.Pending;
  const pendingQueue = proposalStatus === ProposalState.Succeeded;
  const pendingExecution = proposalStatus === ProposalState.Queued;
  const executionReady = pendingExecution && moment().isAfter(executionEtaTime);

  const getHelperMessage = useCallback(() => {
    if (proposalStatus === ProposalState.Executed)
      return "Proposal was successfully executed";
    if (pendingExecution)
      return `Proposal queued. Ready to execute${
        executionReady ? "" : " " + executionEtaLabel
      }.`;
    if (pendingQueue) return "Proposal Succeeded and ready to be queued";
    if (votingPeriodActive)
      return `Voting period started. ${votingPeriodRemaining} remaining`;
    if (votingPeriodExpired) return "Voting period has expired";
    if (votingPeriodPending) return "Voting period has not started yet";
    return undefined;
  }, [
    pendingExecution,
    pendingQueue,
    votingPeriodExpired,
    proposalStatus,
    votingPeriodActive,
    votingPeriodPending,
    votingPeriodRemaining,
    executionReady,
    executionEtaLabel,
  ]);

  const helperMessage = useMemo(() => getHelperMessage(), [getHelperMessage]);

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
                <StatusPill
                  status={proposalDetails?.state}
                  statusName={statusName}
                />
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
                <div className="flex flex-col gap-1">
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
                      {!votingPeriodExpired && (
                        <>
                          <Button
                            className="text-sm rounded-full text-center"
                            onClick={(e) => {
                              const truncatedTitle = truncateString(
                                title,
                                30,
                                "end"
                              );
                              toast.promise(handleVote(e, VoteWay.FOR), {
                                loading: `Submitting votes to Proposal: ${truncatedTitle}`,
                                success: `Successfully voted on Proposal ID:${truncatedTitle}`,
                                error:
                                  "Error while trying to submit votes. Try again later",
                              });
                            }}
                            disabled={
                              !userAddress ||
                              !!submitting ||
                              votingPeriodPending
                            }
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
                              const truncatedTitle = truncateString(
                                title,
                                30,
                                "end"
                              );
                              toast.promise(handleVote(e, VoteWay.ABSTAIN), {
                                loading: `Submitting votes to Proposal: ${truncatedTitle}`,
                                success: `Successfully voted on Proposal ID:${truncatedTitle}`,
                                error:
                                  "Error while trying to submit votes. Try again later",
                              });
                            }}
                            disabled={
                              !userAddress ||
                              !!submitting ||
                              votingPeriodPending
                            }
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
                        </>
                      )}
                      {pendingQueue && (
                        <Button
                          className="text-sm rounded-full text-center py-1 !bg-transparent border-yellow-600 border-[2px] border-solid"
                          onClick={(e) => {
                            const truncatedTitle = truncateString(
                              title,
                              30,
                              "end"
                            );
                            toast.promise(handleQueueProposal(e), {
                              loading: `Queueing Proposal: ${truncatedTitle}. Awaiting transaction.`,
                              success: `Successfully queued Proposal:${truncatedTitle}`,
                              error:
                                "Error while trying to queue proposal. Try again later",
                            });
                          }}
                          disabled={!userAddress || !!submitting}
                        >
                          {submitting ? (
                            <LoadingSpinner />
                          ) : (
                            <>
                              <Text className="text-sm text-gray-100">
                                Queue Proposal
                              </Text>
                              <FontAwesomeIcon
                                icon={faHourglass3}
                                size="sm"
                                className={`text-gray-400`}
                              />
                            </>
                          )}
                        </Button>
                      )}
                      {pendingExecution && (
                        <Button
                          className="text-sm rounded-full text-center py-1 !bg-transparent border-violet-600 border-[2px] border-solid"
                          onClick={(e) => {
                            const truncatedTitle = truncateString(
                              title,
                              30,
                              "end"
                            );
                            toast.promise(handleExecuteProposal(e), {
                              loading: `Executing Proposal: ${truncatedTitle}. Awaiting transaction.`,
                              success: `Successfully executed Proposal:${truncatedTitle}`,
                              error:
                                "Error while trying to execute proposal. Try again later",
                            });
                          }}
                          disabled={
                            !userAddress || !!submitting || !executionReady
                          }
                        >
                          {submitting ? (
                            <LoadingSpinner />
                          ) : (
                            <>
                              <Text className="text-sm text-gray-100">
                                Execute Proposal
                              </Text>
                              <FontAwesomeIcon
                                icon={faRocket}
                                size="sm"
                                className={`text-gray-400`}
                              />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {helperMessage && (
                    <Text className="text-sm text-gray-500 text-right">
                      {helperMessage}
                    </Text>
                  )}
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
