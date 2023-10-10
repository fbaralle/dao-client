import React, { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { Button, buttonVariationsClasses } from "../atoms/Button";
import Text from "../atoms/Text";

interface RerconfirmError {
  reConfirmError?: boolean;
  reConfirmErrorMsg?: string;
  reConfirmErrorTitle?: string;
  reConfirmErrorClassName?: string;
}
interface ModalButtonProps {
  title: string;
  titleIcon?: Element | ReactElement;
  variant?: keyof typeof buttonVariationsClasses;
  buttonClassName?: string;
  reConfirmError?: RerconfirmError;
  onClick: (e: any) => void;
  secondaryClick?: () => void;
  loading?: boolean;
  secondaryLoading?: boolean;
  secondaryButton?: boolean;
  containerClassName?: string;
  secondaryTitle?: string;
  secondaryClassName?: string;
  disabled?: boolean;
}

export const ModalButtons: React.FC<ModalButtonProps> = ({
  title,
  titleIcon,
  variant,
  buttonClassName,
  reConfirmError,
  onClick,
  secondaryClick,
  loading,
  secondaryLoading,
  secondaryButton,
  containerClassName,
  secondaryTitle,
  secondaryClassName,
  disabled,
}) => {
  const error = (
    <Text className="md:text-md mt-4 mb-2 text-center text-sm font-thin tracking-wide text-text-destructive md:my-0">
      {reConfirmError?.reConfirmErrorMsg}
    </Text>
  );

  return (
    <div
      className={twMerge(
        "top-auto mb-10 w-full md:bottom-0 md:mb-0 md:box-border md:border-x-0 md:border-t-[1px] md:border-b-0 md:border-solid md:border-border-primary md:p-6",
        containerClassName
      )}
    >
      {reConfirmError?.reConfirmError ? (
        <>
          <Button
            disabled
            className={twMerge(reConfirmError?.reConfirmErrorClassName)}
          >
            <Text>{title}</Text>
          </Button>
          {reConfirmError?.reConfirmErrorMsg && error}
          <Button
            variant="destructive"
            className={twMerge("mb-4 md:mt-2 md:mb-0", buttonClassName)}
            onClick={onClick}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Text>{reConfirmError?.reConfirmErrorTitle}</Text>
            )}
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={variant}
            className={twMerge(buttonClassName)}
            onClick={onClick}
            disabled={disabled}
          >
            <>
              {titleIcon}
              {loading ? <LoadingSpinner /> : <Text>{title}</Text>}
            </>
          </Button>
          {secondaryButton && (
            <Button
              variant="neutral"
              className={twMerge(
                "align-center mt-4 flex w-full justify-center md:mb-6",
                secondaryClassName
              )}
              onClick={secondaryClick}
            >
              {secondaryLoading ? (
                <LoadingSpinner />
              ) : (
                <Text>{secondaryTitle}</Text>
              )}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
