import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonBase = [
  "text-sm",
  "px-4",
  "py-3",
  "font-normal",
  "rounded-lg",
  "border-solid",
  "border-[1px]",
  "border-border-primary",
  "focus:ring-0",
  "inline-flex",
  "items-center",
  "gap-2",
  "disabled:bg-background-highlight",
  "disabled:border-none",
  "disabled:text-text-subdued",
  "disabled:cursor-not-allowed",
  "focus:outline-none",
  "[&>svg]:w-4",
  "[&>svg]:h-4",
  "relative",
  "transition-colors",
  "duration-150",
];

const buttonBadgeStyle = [
  "rounded-md",
  "text-text-default",
  "px-3",
  "py-2",
  "capitalize",
  "hover:bg-border-primary",
  "focus:bg-border-primary",
];

const gray = classNames(
  ...buttonBase,
  "hover:bg-button-secondary-hover",
  "focus:bg-button-secondary-hover",
  "bg-background-popout",
  "text-text-default"
);

export const buttonVariationsClasses = {
  neutral: gray,
  primary: classNames(
    ...buttonBase,
    "hover:bg-button-primary-hover",
    "focus:bg-button-primary-hover",
    "bg-button-primary",
    "border-0",
    "text-text-black"
  ),
  destructive: classNames(
    ...buttonBase,
    "border-button-destructive-border",
    "text-text-destructive",
    "bg-background-popout"
  ),
  "no-styles": classNames(
    "p-0",
    "m-0",
    "border-0",
    "bg-transparent",
    "focus:outline-none"
  ),
  "badge-button": classNames(
    ...buttonBase,
    ...buttonBadgeStyle,
    "dark:bg-background-highlight bg-background-popout",
    "border-border-primary",
    "px-4"
  ),
  "badge-button-icon": classNames(
    ...buttonBase,
    ...buttonBadgeStyle,
    "bg-shading-gray",
    "border-border-primary"
  ),
  default: gray,
};

const labelBorderStyle = classNames(
  "border-border-teal",
  "border-solid",
  "border-1",
  "relative"
);

const labelStyle = classNames(
  "bg-background-teal",
  "text-text-white",
  "absolute",
  "top-[-16px]",
  "right-[-8px]",
  "py-1",
  "px-[10px]",
  "rounded-lg"
);

export interface ButtonPropType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  variant?: keyof typeof buttonVariationsClasses;
  disabled?: boolean;
  labelText?: string;
}

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<HTMLButtonElement, ButtonPropType>(
  (
    {
      type = "button",
      children,
      variant = "default",
      className,
      labelText,
      ...props
    },
    ref
  ) => {
    return (
      <button
        {...props}
        // eslint-disable-next-line react/button-has-type
        type={type}
        ref={ref}
        className={twMerge(
          buttonVariationsClasses[variant],
          className,
          labelText ? labelBorderStyle : ""
        )}
      >
        {labelText && <span className={labelStyle}>{labelText}</span>}
        {children}
      </button>
    );
  }
);
