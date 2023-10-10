import classNames from 'classnames';
import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const HoverText: React.FC<LinkProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <a
      className={classNames(
        className,
        'cursor-pointer transition-colors duration-200 hover:text-text-link-hover'
      )}
      {...props}
    >
      {children}
    </a>
  );
};
