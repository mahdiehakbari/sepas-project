import React from 'react';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  type = 'text',
  full = false,
  errors,
  textError,
  rules = {},
}) => {
  const hasError = !!errors[name];
  const isRequired = rules?.required !== false;
  return (
    <div className={`flex flex-col ${full ? 'col-span-2' : ''}`}>
      <input
        {...register(name, { required: isRequired && textError, ...rules })}
        type={type}
        placeholder={isRequired ? `${label} *` : label}
        className={`bg-white border rounded-lg px-3 py-2 text-right placeholder-gray-400 
                    focus:outline-none focus:ring-2
                    ${
                      hasError
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
      />
      {hasError && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[name]?.message?.toString() || textError}
        </span>
      )}
    </div>
  );
};
