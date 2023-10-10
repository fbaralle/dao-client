import classNames from "classnames";
import React from "react";
import { DebounceInputProps, DebounceInput } from "react-debounce-input";

const styles = {
  inputWrapper: "",
  fullWidth: "w-full",
  inputFullWidth: "",
  disabled: "",
  formInput: "",
  invalid: "",
  withButton: "",
  withIcon: "",
  checkbox: "",
};

interface FormInputProps {
  icon?: React.ReactElement;
  invalid?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: any;
  minLength?: number;
  maxLength?: number;
  as?: "input" | "textarea";
}

const FormInput: React.FC<
  DebounceInputProps<HTMLInputElement, FormInputProps>
> = (props) => {
  const {
    icon,
    invalid,
    type,
    id,
    fullWidth,
    className,
    disabled,
    minLength,
    maxLength,
    as,
    ...rest
  } = props;
  return (
    <DebounceInput
      element={as || "input"}
      {...rest}
      type={type}
      maxLength={maxLength}
      minLength={minLength}
      id={id}
      disabled={disabled}
      className={classNames(
        "flex border-solid border-[1px] border-subdued rounded-md items-center bg-background-popout p-2",
        {
          ["w-full"]: fullWidth,
          [styles.disabled]: disabled,
          ["border-border-warning"]: Boolean(invalid),

          [styles.withIcon]: Boolean(icon),
          [styles.checkbox]: type === "checkbox",
        }
      )}
    />
  );
};

export default FormInput;
