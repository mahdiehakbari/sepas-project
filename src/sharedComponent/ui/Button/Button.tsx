import { forwardRef } from 'react';
import { ButtonProps } from './types';
import { cn } from '@/sharedComponent/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-[8px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',

          variant === 'primary' &&
            'bg-button-primary text-white hover:bg-blue-700 focus:ring-blue-500',
          variant === 'secondary' &&
            'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
          variant === 'outline' &&
            'bg-transparent border border-gray-300 hover:bg-gray-100',

          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'w-[161px] h-[41px] text-base',
          size === 'lg' && 'px-6 py-3 text-lg',

          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
