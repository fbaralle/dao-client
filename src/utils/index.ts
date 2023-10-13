import { formatValue } from "react-currency-input-field";
import { formatUnits } from "viem";

export function truncateString(
  str: string,
  num: number,
  position: "end" | "middle" = "end"
) {
  if (!str) return null;
  if (str.length > num) {
    if (position === "end") {
      return str.slice(0, num) + "..";
    }

    if ((position = "middle")) {
      return str.slice(0, num / 2) + "..." + str.slice(str.length - num / 2);
    }
  } else {
    return str;
  }
}

export const formatTokenValue = (value: string | number | undefined) => {
  if (!value || (typeof value !== "number" && typeof value !== "string")) {
    return "--";
  }

  return formatValue({
    value: formatUnits(BigInt(value), 18),
    decimalSeparator: ",",
  });
};
