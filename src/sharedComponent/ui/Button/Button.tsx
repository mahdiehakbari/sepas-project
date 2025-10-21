import { forwardRef } from 'react';
import { ButtonProps } from './types';
import { cn } from '@/sharedComponent/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'cursor-pointer inline-flex items-center justify-center font-medium rounded-[8px] transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none',

          variant === 'primary' &&
            'bg-button-primary text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-[#cbe5f8]',
          variant === 'secondary' &&
            'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-[#cbe5f8]',
          variant === 'outline' &&
            'bg-transparent border border-primary text-primary hover:bg-gray-100 disabled:bg-[#cbe5f8]',

          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' &&
            'w-[161px] h-[42px] text-base font-[500] text-[16px]',
          size === 'lg' && 'w-[275px] h-[42px] font-[500] text-[16px]',

          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
