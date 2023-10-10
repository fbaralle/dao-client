import React from "react";
import { twMerge } from "tailwind-merge";
import Text from "../Text";

const inputVariantClasses = {
  invalid:
    "box-border ring-0 font-light border-button-destructive-border dark:bg-background-popout outline-none bg-red-100 placeholder:text-text-disabled text-text-subdued focus:outline-none focus:ring-0 focus:ring-text-link focus:border-button-destructive-border rounded-lg px-4 py-3 text-xs lg:text-sm w-full box-border",
  default:
    "box-border ring-0 border font-light border-border-primary bg-background-popout placeholder:text-text-disabled text-text-default focus:outline-none focus:ring-0 focus:ring-text-link focus:border-transparent rounded-lg px-4 py-3 text-xs lg:text-sm",
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof inputVariantClasses;
  errorMsg?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  containerClassName,
  variant = "default",
  type = "text",
  errorMsg,
  ...rest
}) => {
  return (
    <span
      className={twMerge(
        "flex flex-col justify-start align-middle",
        containerClassName
      )}
    >
      <input
        type={type}
        className={twMerge(inputVariantClasses[variant], className)}
        {...rest}
      />
      {errorMsg && (
        <Text variant="p" className="pt-3 text-text-destructive">
          {errorMsg}
        </Text>
      )}
    </span>
  );
};
