import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, error, icon, multiline, ...props }, ref) => {
    const Component = multiline ? 'textarea' : 'input';

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        <Component
          className={cn(
            'glass-input',
            icon && 'pl-10',
            error && 'border-red-500/50 focus:ring-red-500/30',
            multiline && 'min-h-[80px] resize-none',
            className
          )}
          ref={ref as any}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };