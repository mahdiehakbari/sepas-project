'use client';
import React from 'react';
import { ICardProps } from './types';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';

const Card: React.FC<ICardProps> = ({
  title,
  amountReceived,
  cost,
  remaining,
  borderColor = 'bg-blue-400',
  image,
}) => {
  const { t } = useTranslation();

  return (
    <div className='relative w-72 rounded-xl border border-primary bg-white pt-4 px-4 '>
      <div
        className={`absolute right-0 top-0 h-full w-2 rounded-r-xl ${borderColor}`}
      ></div>

      <div className='flex items-center gap-2 mb-2'>
        <Image src={image} alt={title} width={40} height={40} />
        <h2 className='text-gray-800 font-semibold text-lg'>{title}</h2>
      </div>

      <div className='text-sm text-gray-700 space-y-1'>
        <div className='flex justify-between mb-2'>
          <span>مبلغ دریافتی</span>
          <div>
            <span>{amountReceived}</span>
            <span className='text-black  font-normal text-[14px]'>ریال</span>
          </div>
        </div>
        <div className='flex justify-between mb-2'>
          <span>میزان هزینه</span>
          <div>
            <span>{cost}</span>
            <span className='text-black  font-normal text-[14px]'>ریال</span>
          </div>
        </div>
        <div className='flex justify-between  mb-2'>
          <span className='text-black  font-bold text-[14px]'>
            {t('my_planes:remaining_amount')}
          </span>
          <div className='flex items-center gap-1'>
            <span className='text-black  font-bold text-[14px]'>
              {remaining}
            </span>
            <span className='text-black  font-bold text-[14px]'>ریال</span>
          </div>
        </div>
      </div>

      <div className='border-t border-border-color mt-3 '>
        <Button
          disabled
          className='w-full text-primary text-sm text-center hover:underline bg-transparent disabled:bg-transparent '
        >
          جزئیات بیشتر
        </Button>
      </div>
    </div>
  );
};

export default Card;
