import React, { HTMLProps, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface CheckboxPropType extends HTMLProps<HTMLInputElement> {
  type?: "checkbox" | "radio";
  label?: string;
  labelClassName?: string;
}

const baseStyle = [
  "flex",
  "place-content-center",
  "place-items-center",
  "peer-focus:ring-1",
  "peer-checked:bg-text-link",
  "[&>svg]:peer-checked:block",
  "[&>svg]:peer-disabled:opacity-50",
  "[&>svg]:peer-disabled:cursor-not-allowed",
  "h-4",
  "w-4",
  "block",
  "border-[1px]",
  "border-solid",
  "border-border-primary",
  "bg-background-popout",
  "border-border-primary",
];

const typeClasses = {
  checkbox: classNames(...baseStyle, "rounded-[4px]"),
  radio: classNames(
    ...baseStyle,
    "rounded-full",
    "[&>svg]:w-2",
    "bg-background-popout"
  ),
};

export const Checkbox: React.FC<CheckboxPropType> = ({
  type = "checkbox",
  className,
  labelClassName,
  label,
  ...rest
}) => {
  const customApparance = useMemo(() => {
    if (typeClasses[type]) {
      return typeClasses[type];
    }

    return typeClasses.checkbox;
  }, [type]);

  return (
    <div className="relative flex items-center gap-2">
      <input
        type={type}
        className={twMerge(
          classNames(
            "peer",
            "opacity-0",
            "absolute",
            "top-0",
            "w-full",
            "h-full",
            "cursor-pointer",
            "disabled:cursor-not-allowed"
          ),
          className
        )}
        {...rest}
      />

      <span className={customApparance}>
        {type === "checkbox" ? (
          <FontAwesomeIcon
            icon={faCheck}
            className="hidden w-3 text-text-inverted"
          />
        ) : null}

        {type === "radio" ? (
          <FontAwesomeIcon
            icon={faCircle}
            className="hidden w-[6px] text-text-inverted"
          />
        ) : null}
      </span>

      {label ? (
        <span
          className={twMerge(
            classNames(
              "inline-block cursor-pointer text-sm font-normal text-text-subdued peer-checked:text-text-default",
              labelClassName,
              {
                "cursor-not-allowed opacity-50": rest.disabled,
              }
            )
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};
