import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { copyTextClassName } from './CopyText';
import {
  CopyTextWithLabel,
  copyTextWithLabelClassName,
} from './CopyTextWithLabel';

import { TippyTextWithLabel } from './TippyTextWithLabel';

const inline = {
  container: 'flex flex-row flex-wrap gap-6',
  copyTextWithLabel: copyTextWithLabelClassName,
  copyText: copyTextClassName,
};

const largeScreenInline = {
  container: 'lg:flex lg:flex-row lg:flex-wrap lg:gap-6',
  // NOTE: same styles from copyTextWithLabelClassName but with lg: prefix
  copyTextWithLabel: classNames(
    'lg:py-1',
    'lg:pr-1',
    'lg:pl-4',
    'lg:box-border',
    'lg:rounded-lg',
    'lg:bg-background-highlight',
    'lg:flex',
    'lg:items-center',
    'lg:justify-between gap-2',
    'lg:w-fit',
    'lg:max-w-[fill-available]',
    'lg:capitalize'
  ),
  // NOTE: same styles from copyTextClassName but with lg: prefix
  copyText: classNames(
    'lg:flex',
    'lg:items-center',
    'lg:justify-between',
    'lg:gap-2',
    'lg:rounded-lg',
    'lg:border-[1px]',
    'lg:border-solid',
    'lg:border-border-primary',
    'lg:bg-background-popout',
    'lg:p-3',
    'lg:text-xs',
    'lg:text-text-link',
    'lg:hover:bg-button-secondary-hover'
  ),
};

const columns = {
  container: 'flex flex-col gap-0',
  copyTextWithLabel: classNames(
    'group/item',

    'w-full',
    'grid !grid-cols-3',

    // radius
    'rounded-none',
    'first:rounded-t-lg',
    'last:rounded-b-lg',

    // padding
    'pt-0',
    'pb-0',
    'first:pt-1',
    'last:pb-1'
  ),
  copyText: classNames(
    // radius
    'rounded-none',
    'col-span-2',
    'group-first/item:rounded-t-lg',
    'group-last/item:rounded-b-lg',

    // border
    'group-last/item:border-b-[1px]',
    'group-first/item:border-t-[1px]',
    'border-t-0'
  ),
};

const variants = {
  responsive: {
    container: twMerge(columns.container, largeScreenInline.container),
    copyTextWithLabel: twMerge(
      columns.copyTextWithLabel,
      largeScreenInline.copyTextWithLabel
    ),
    copyText: twMerge(columns.copyText, largeScreenInline.copyText),
  },
  columns,
  inline,
};

export type CopyTextItem = {
  label: string;
  displayText: string;
  textToCopy?: string;
  tippyContent?: string;
};

export interface CopyTextGroupProps {
  variant: keyof typeof variants;
  items: CopyTextItem[];
  className?: string;
  copyLabelClassName?: string;
  copyTextClassName?: string;
  tippyLabelClassName?: string;
}

export const CopyTextGroup: React.FC<CopyTextGroupProps> = ({
  items,
  variant = 'responsive',
  className,
  copyLabelClassName,
  copyTextClassName: copyTextClassNameOverride,
  tippyLabelClassName,
}) => {
  const variantClasses = variants[variant];

  return (
    <div className={twMerge(variantClasses.container, className)}>
      {items.map((item) => {
        if (item.textToCopy) {
          return (
            <CopyTextWithLabel
              key={item.label}
              className={twMerge(
                variantClasses.copyTextWithLabel,
                copyLabelClassName
              )}
              copyTextClassName={twMerge(
                variantClasses.copyText,
                copyTextClassNameOverride
              )}
              label={item.label}
              displayText={item.displayText}
              textToCopy={item.textToCopy}
            />
          );
        }

        if (item.tippyContent) {
          return (
            <TippyTextWithLabel
              key={item.label}
              label={item.label}
              displayText={item.displayText}
              tippyContent={item.tippyContent}
              className={twMerge(
                variantClasses.copyTextWithLabel,
                copyLabelClassName,
                tippyLabelClassName
              )}
            />
          );
        }

        return null;
      })}
    </div>
  );
};
