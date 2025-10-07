import React from 'react';
import { UseFormRegister } from 'react-hook-form';
interface ProfileFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  birthDate: string;
  gender: string;
  email: string;
  iban: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

interface InputProps {
  label: string;
  name: keyof ProfileFormValues;
  register: UseFormRegister<ProfileFormValues>;
  required?: boolean;
  type?: string;
  full?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  required = false,
  type = 'text',
  full = false,
}) => {
  return (
    <div className={`flex flex-col ${full ? 'col-span-2' : ''}`}>
      <label className='text-sm font-medium text-gray-700 mb-1 text-right'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        {...register(name, { required })}
        type={type}
        placeholder={label}
        className='border border-gray-300 rounded-lg px-3 py-2 text-right 
                   placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500'
      />
    </div>
  );
};
