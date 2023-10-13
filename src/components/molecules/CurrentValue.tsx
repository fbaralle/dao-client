import { useQuery } from "@tanstack/react-query";
import Text from "../atoms/Text";
import { getCurrentValue } from "@/utils/helpers/governance";

const CurrentValue = () => {
  const { data } = useQuery({
    queryKey: ["current-value"],
    queryFn: getCurrentValue,
    initialData: [],
    staleTime: 300 * 1000, // 5 minutes,
    refetchOnMount: true,
    refetchInterval: (data: any) =>
      Array.isArray(data) && data.length ? 300 * 1000 : 10 * 1000, // 10 sec. until valid data, then 5 minutes,
  });

  return (
    <div className="flex flex-row bg-gray-900 p-2 px-4 rounded-2xl text-center text-gray-400 text-xs gap-4 items-center text-right border-solid border-[2px] border-violet-400">
      <Text className="max-w-[80px]">Current Protocol A.P.Y</Text>
      <Text as="h3" className="text-gray-200 ">{`${
        data?.value ?? "--"
      }%`}</Text>
    </div>
  );
};

export default CurrentValue;
