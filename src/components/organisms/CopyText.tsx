import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Text from '../atoms/Text';

export interface CopyTextProps {
  displayText: string;
  textToCopy: string;
  className?: string;
  onTextCopied?: () => void;
}

export const copyTextClassName =
  'flex items-center justify-between gap-2 rounded-lg border-[1px] border-solid border-border-primary bg-background-popout p-3 text-xs text-text-link hover:bg-button-secondary-hover md:text-sm';

export const CopyText: React.FC<CopyTextProps> = ({
  displayText,
  textToCopy,
  className,
  onTextCopied,
}) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setShowCopied(true);
    onTextCopied?.();
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  }, [onTextCopied]);

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      <button
        className={classNames(copyTextClassName, className)}
        type="button"
      >
        <Text
          variant="bodyMd"
          data-notranslate
          className="overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {displayText}
        </Text>

        {showCopied ? (
          <CheckIcon className="w-5 shrink-0" />
        ) : (
          <Square2StackIcon className="w-5 shrink-0" />
        )}
      </button>
    </CopyToClipboard>
  );
};
