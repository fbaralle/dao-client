import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      style={{
        position: "relative",
        boxSizing: "border-box",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "2px solid var(--borderPrimaryColor)",
        borderTopColor: "var(--textDefaultColor)",
      }}
      className={twMerge("animate-spin", className)}
    ></div>
  );
};

export default LoadingSpinner;
