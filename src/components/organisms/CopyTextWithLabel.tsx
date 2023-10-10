import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Text from '../atoms/Text';
import { CopyText, CopyTextProps } from './CopyText';

export interface CopyTextLabelProps extends CopyTextProps {
  label: string;
  copyTextClassName?: string;
}

export const copyTextWithLabelClassName = classNames(
  'py-1 pr-1 pl-4 box-border',
  'rounded-lg bg-background-highlight',
  'flex items-center justify-between gap-2',
  'w-fit',
  'max-w-[fill-available]',
  'capitalize'
);

export const CopyTextWithLabel: React.FC<CopyTextLabelProps> = ({
  displayText,
  textToCopy,
  label,
  className,
  copyTextClassName,
}) => {
  return (
    <div className={twMerge(copyTextWithLabelClassName, className)}>
      <Text
        variant="bodyMd"
        className="overflow-hidden text-ellipsis whitespace-nowrap text-text-subdued"
      >
        {label}
      </Text>

      <CopyText
        displayText={displayText}
        textToCopy={textToCopy}
        className={copyTextClassName}
      />
    </div>
  );
};
