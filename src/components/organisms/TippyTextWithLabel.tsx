import React from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import ThemedTippy from "@/components/organisms/ThemedTippy";
import Text from "../atoms/Text";

export const tippyTextWithLabelClassName = classNames(
  "py-1 px-4 box-border",
  "rounded-lg bg-background-highlight",
  "flex items-center justify-between gap-2",
  "w-fit",
  "max-w-[fill-available]",
  "capitalize"
);

export const TippyTextWithLabel: React.FC<{
  displayText: string;
  label: string;
  className: string;
  tippyContent: string;
}> = ({ displayText, tippyContent, label, className }) => {
  return (
    <ThemedTippy
      content={
        <Text variant="bodyMd-light" className="text-text-primary">
          {tippyContent}
        </Text>
      }
    >
      <div className={twMerge(tippyTextWithLabelClassName, className)}>
        <Text
          variant="bodyMd"
          className="overflow-hidden text-ellipsis whitespace-nowrap text-text-subdued"
        >
          {label}
        </Text>

        <Text
          variant="bodyMd-med"
          className="overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {displayText}
        </Text>
      </div>
    </ThemedTippy>
  );
};
