import Text from "../atoms/Text";
import classNames from "classnames";

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

const {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
} = ProposalState;

const statusColors = {
  [Pending]: "bg-gray-600",
  [Active]: "bg-sky-600",
  [Canceled]: "bg-slate-600",
  [Defeated]: "bg-stone-600",
  [Succeeded]: "bg-green-600",
  [Queued]: "bg-yellow-600",
  [Expired]: "bg-gray-600",
  [Executed]: "bg-violet-600",
};

const StatusPill = ({
  status,
  statusName,
}: {
  status: ProposalState;
  statusName: string;
}) => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <Text className="text-sm">Status</Text>
      <div
        className={classNames(
          "px-1 rounded-md text-gray-100",
          statusColors[status]
        )}
      >
        <Text className="p-0 text-xs">{statusName.toUpperCase()}</Text>
      </div>
    </div>
  );
};

export default StatusPill;
