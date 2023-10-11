import { useUserWallet } from "@/context/wallet-data.context";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlockchainStats = () => {
  const { chainStats, isLoadingChainStats } = useUserWallet();

  const color = chainStats ? "green-300" : "gray-300";
  const label = chainStats.name ? chainStats.name : "Not Connected";

  return (
    <p
      className={`fixed left-0 top-0 flex flex-row gap-2 items-center self-start justify-center border-b border-${color} bg-gradient-to-b from-zinc-200 py-2 px-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 text-xs`}
    >
      {isLoadingChainStats && "Connecting..."}
      {!isLoadingChainStats && label}
      {chainStats.chainId && (
        <FontAwesomeIcon
          icon={faCircle}
          size="2xs"
          className={`text-${color}`}
        />
      )}
    </p>
  );
};

export default BlockchainStats;
