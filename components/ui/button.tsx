import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'btn';
    
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      destructive: 'bg-error text-white shadow-btn-primary hover:bg-red-600 hover:shadow-btn-primary-hover hover:-translate-y-0.5 active:bg-red-700 active:translate-y-0 active:shadow-btn-primary disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none disabled:translate-y-0',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-7 py-3.5 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };