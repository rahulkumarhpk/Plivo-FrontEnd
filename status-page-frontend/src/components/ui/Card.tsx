import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white p-4 rounded-lg shadow-sm border ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }: CardProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }: CardProps) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: CardProps) => (
  <div className={`mt-4 pt-3 border-t ${className}`}>{children}</div>
);
