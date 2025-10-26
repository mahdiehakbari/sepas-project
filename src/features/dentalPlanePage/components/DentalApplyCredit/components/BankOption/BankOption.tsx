'use client';

import Image from 'next/image';
import { IBankOptionProps } from './types';

export const BankOption = ({
  value,
  label,
  logo,
  selectedBank,
  setSelectedBank,
}: IBankOptionProps) => {
  const isSelected = selectedBank === value;

  return (
    <label
      className={`
        flex items-center border rounded-lg p-3 cursor-pointer
        transition-colors border-gray-300 max-w-[200px]
        ${isSelected ? ' bg-[var(--light-primary)]' : ''}
      `}
    >
      <input
        type='radio'
        name='bank'
        value={value}
        checked={isSelected}
        onChange={() => setSelectedBank(value)}
        className='hidden'
      />
      <span className='ml-4 w-4 h-4 border-2 border-primary rounded-full flex-shrink-0 relative'>
        <span className='block w-2 h-2 bg-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
      </span>
      <Image src={logo} alt={label} width={32} height={32} className='ml-2' />
      <span className='text-gray-800 font-medium'>{label}</span>
    </label>
  );
};
