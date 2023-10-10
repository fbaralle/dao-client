import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';
import Text, { TextStyles } from './Text';

export interface TruncateProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: ReactNode;
  lines?: number | null;
  textVariant?: TextStyles;
  onTruncate?: (didTruncate: boolean) => void;
}

export const Truncate = ({
  children,
  lines = 1,
  onTruncate,
  textVariant,
  ...spanProps
}: TruncateProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const callTruncatedEvent = useCallback(() => {
    if (ref.current && onTruncate) {
      const isTruncated = ref.current.offsetHeight < ref.current.scrollHeight;
      onTruncate(isTruncated);
    }
  }, [onTruncate, ref]);

  useEffect(() => {
    callTruncatedEvent();

    window.addEventListener('resize', callTruncatedEvent);

    return () => {
      window.removeEventListener('resize', callTruncatedEvent);
    };
  }, [callTruncatedEvent]);

  return (
    <Text
      as="span"
      ref={ref}
      {...spanProps}
      variant={textVariant}
      className={twMerge(spanProps.className, `line-clamp-${lines || 'none'}`)}
    >
      {children}
    </Text>
  );
};
