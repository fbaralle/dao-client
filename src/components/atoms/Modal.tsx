import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { Transition } from "react-transition-group";
import classNames from "classnames";
import { Button } from "./Button";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  open: boolean;
  contentClassName?: string;
  closeButton?: boolean;
  closeButtonClassName?: string;
  hideOverlay?: boolean;
  disableModalMode?: boolean;
  allowInteractionOutside?: boolean;
  dontCloseWhenInteractionOutside?: boolean;
  onDismiss: () => void;
}

export const Modal = ({
  children,
  className,
  open,
  closeButton,
  closeButtonClassName,
  onDismiss,
  contentClassName,
  hideOverlay,
  disableModalMode,
  allowInteractionOutside,
  dontCloseWhenInteractionOutside,
}: ModalProps) => {
  const onPointerDownOutside = !dontCloseWhenInteractionOutside
    ? onDismiss
    : undefined;

  return (
    <Transition
      in={open}
      timeout={{
        appear: 0,
        enter: 300,
        exit: 300,
      }}
      unmountOnExit
      mountOnEnter
    >
      {(state: any) => {
        const tailwindStates = {
          entering: "translate-y-0 opacity-1",
          entered: "translate-y-0 opacity-1",
          exiting: "opacity-0 translate-y-2",
          exited: "opacity-0 translate-y-2",
        };

        const overlay = {
          entering: "opacity-1",
          entered: "opacity-1",
          exiting: "opacity-0",
          exited: "opacity-0",
        };

        return (
          <Dialog.Root
            modal={!disableModalMode}
            open={
              open ||
              state === "entering" ||
              state === "entered" ||
              state === "exiting"
            }
          >
            <Dialog.Portal>
              {!hideOverlay && (
                <Dialog.Overlay
                  className={twMerge(
                    "fixed inset-0 z-50 bg-background-focusTransparent shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] backdrop-blur-md",
                    "transition-all duration-300 ease-in-out",
                    // @ts-ignore
                    overlay[state],
                    className
                  )}
                />
              )}
              <Dialog.Content
                onPointerDownOutside={
                  allowInteractionOutside ? undefined : onPointerDownOutside
                }
                className={twMerge(
                  "fixed bottom-0 left-[50%] z-50 box-border max-h-full w-full translate-x-[-50%] overflow-auto rounded-t-lg border-[1px] border-solid border-border-primary bg-background-main px-4 pt-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none",

                  ...(disableModalMode
                    ? []
                    : [
                        "md:top-[50%]",
                        "md:bottom-auto",
                        "md:min-h-[300px]",
                        "md:w-[90vw]",
                        "md:max-w-[550px]",
                        "md:translate-y-[-50%]",
                        "md:rounded-[8px]",
                        "md:px-0",
                        "md:pt-0",
                      ]),
                  contentClassName,
                  "transition-all duration-300 ease-in-out",
                  // @ts-ignore
                  tailwindStates[state]
                )}
              >
                {closeButton && (
                  <Dialog.Close asChild>
                    <Button
                      className={twMerge(
                        classNames(
                          "absolute right-3.5 z-10 inline-flex h-6 w-6 items-center justify-center border-none bg-none md:top-6",
                          closeButtonClassName
                        )
                      )}
                      aria-label="Close"
                      onClick={onDismiss}
                      variant="no-styles"
                    >
                      <XMarkIcon className="w-6 text-text-subdued" />
                    </Button>
                  </Dialog.Close>
                )}
                {children}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        );
      }}
    </Transition>
  );
};
