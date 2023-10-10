import React from "react";
import classNames from "classnames";

interface FormGroupProps {
  style?: any;
  className?: any;
}

const FormGroup: React.FC<React.PropsWithChildren<FormGroupProps>> = (
  props
) => {
  return (
    <div
      className={classNames("mx-0 my-2 w-full", props.className)}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default FormGroup;
