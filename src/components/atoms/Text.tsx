import React, {
  createElement,
  forwardRef,
  HTMLAttributes,
  ReactHTML,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const baseStyle = "m-0 font-lexend text-text-default text-inherit";

export const textDefaultStyles = {
  h1: "text-2xl sm:text-4xl font-medium",
  h1Hero: "text-2.5xl sm:text-5xl font-semibold",
  h2: "text-xl sm:text-2.5xl font-medium",
  h3: "text-lg sm:text-2xl font-medium",
  h4: "text-[17px] sm:text-xl font-normal",
  h5: "text-base sm:text-lg font-normal",
  p: "text-xs sm:text-sm font-light",
  bodySm: "text-xxs sm:text-xs font-light",
  bodySmMedium: "text-xxs sm:text-xs font-normal",
  bodySmSemibold: "text-xxs sm:text-xs font-medium",
  bodyMd: "text-xs sm:text-sm font-light",
  bodyMdMedium: "text-xs sm:text-sm font-normal",
  bodyMdSemibold: "text-xs sm:text-sm font-medium",
  bodyLg: "text-sm sm:text-base font-light",
  bodyLgMedium: "text-sm sm:text-base font-normal",
  bodyLgSemibold: "text-sm sm:text-base font-medium",
  "bodyMd-med": "text-xs sm:text-sm font-medium",
  "bodyMd-light": "text-xs sm:text-sm font-light",
  "bodyMd-reg": "text-xs sm:text-sm font-normal",
};
export type TextStyles = keyof typeof textDefaultStyles;
type FontSizes =
  | "xxs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "2.5xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type TextReactHTMLElements = Omit<ReactHTML, "button" | "a">;
type ElementKeys = keyof TextReactHTMLElements;

export interface TextProps<T>
  extends HTMLAttributes<
    | HTMLElement
    | HTMLHeadingElement
    | HTMLParagraphElement
    | HTMLSpanElement
    | HTMLTableCellElement
    | HTMLLabelElement
  > {
  /** HTML element that will be rendered in the DOM.
   * For e. g. "h1" renders an `<h1></h1>`.
   * Default is "span" element.
   * *Note: Specific interface elements like anchor and button are not allowed*
   * */
  as?: T;
  /** Text style of the element.
   * Overrides `as` element default style
   * Applies the default theme if not specified. */
  variant?: TextStyles;
  fontSize?: FontSizes;
  /** This prop overrides every other style */
  className?: string;
}

/** Typography component for general purpose */
// eslint-disable-next-line
const Text: React.FunctionComponent<TextProps<ElementKeys>> = forwardRef(
  ({ as = "span", children, variant, fontSize, className, ...props }, ref) => {
    const elementProps = {
      className: twMerge(
        classNames(baseStyle, textDefaultStyles[as], {
          [textDefaultStyles[variant as TextStyles]]: !!variant,
          [`text-${fontSize}`]: !!fontSize,
        }),
        className
      ),
      ref,
      ...props,
    };
    return createElement(as, elementProps, children);
  }
);

export default Text;
