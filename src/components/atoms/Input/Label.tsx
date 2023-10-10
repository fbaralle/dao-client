import classNames from "classnames";
import React from "react";
import Text from "../Text";

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  isRequired?: boolean;
}

const Label: React.FC<LabelProps> = ({ isRequired, ...props }) => {
  return (
    <Text
      {...props}
      as="label"
      className={classNames(
        "mb-2 inline-block font-medium text-text-subdued",
        props.className
      )}
      // @ts-ignore
      title={isRequired && `${props.children.toString()} is required`}
    >
      {props.children} {isRequired && <span style={{ color: "red" }}>*</span>}
    </Text>
  );
};

export default Label;
