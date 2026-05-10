import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './BigButton.css';

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function BigButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`cbc-btn cbc-btn--${variant} cbc-btn--${size} ${className}`}
    >
      {children}
    </button>
  );
}
