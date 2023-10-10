import Text from "@/components/atoms/Text";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import { useTheme } from "next-themes";
import React, { ReactElement } from "react";

interface ThemedTippyProps extends React.ComponentProps<typeof Tippy> {
  children;
  content: string | ReactElement;
  className?: string;
  placement?: any;
  disabled?: boolean;
  visible?: boolean;
  interactive?: boolean;
}

const ThemedTippy: React.FC<ThemedTippyProps> = ({
  children,
  content,
  className,
  placement = "bottom",
  disabled,
  visible,
  ...rest
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <Tippy
      className={classNames("tooltip", className)}
      placement={placement}
      content={
        <Text variant="bodyMd-light" className="text-text-default">
          {content}
        </Text>
      }
      theme={resolvedTheme}
      disabled={disabled}
      visible={visible}
      {...rest}
    >
      {children}
    </Tippy>
  );
};

export default ThemedTippy;
