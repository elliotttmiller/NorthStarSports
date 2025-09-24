import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'accent';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-150';
  const variants: Record<string, string> = {
    primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
    secondary: 'bg-muted text-muted-foreground hover:bg-muted/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
