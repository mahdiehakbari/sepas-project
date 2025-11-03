import React from 'react';
import { ICardProps } from './types';

const Card: React.FC<ICardProps> = ({
  title,
  amountReceived,
  cost,
  remaining,
  borderColor = 'bg-blue-400',
}) => {
  return (
    <div className='relative w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200'>
      {/* نوار رنگی ضخیم سمت راست */}
      <div
        className={`absolute right-0 top-0 h-full w-2 rounded-r-xl ${borderColor}`}
      ></div>

      {/* محتوا */}
      <div className='flex items-center justify-between mb-2'>
        <h2 className='text-gray-800 font-semibold text-lg'>{title}</h2>
        <span className='text-blue-500 text-xl'>🦷</span>
      </div>

      <div className='text-sm text-gray-700 space-y-1'>
        <div className='flex justify-between'>
          <span>مبلغ دریافتی</span>
          <span>{amountReceived}</span>
        </div>
        <div className='flex justify-between'>
          <span>میزان هزینه</span>
          <span>{cost}</span>
        </div>
        <div className='flex justify-between font-semibold'>
          <span>مبلغ باقی مانده</span>
          <span className='text-gray-900'>{remaining}</span>
        </div>
      </div>

      <div className='border-t mt-3 pt-2 text-blue-500 text-sm text-center cursor-pointer hover:underline'>
        جزئیات بیشتر
      </div>
    </div>
  );
};

export default Card;
