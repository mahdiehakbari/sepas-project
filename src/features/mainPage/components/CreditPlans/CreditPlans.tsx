'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import { CreditItems } from './constants/CreditItems';
import axios from 'axios';
import { API_SEND_OTP } from '@/config/api_address.config';
export const CreditPlans = () => {
  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      const response = await axios.post(API_SEND_OTP, {
        phoneNumber: '09196003608',
      });
      console.log('✅ OTP sent:', response.data);
    } catch (error) {
      console.error('❌ Error sending OTP:', error);
    }
  };

  return (
    <div className='mx-auto max-w-4xl mb-12  px-6 md:px-0'>
      <h2 className='text-[16px] font-[700] text-black mb-4'>
        {t('home:credit_plans')}
      </h2>

      <div className='flex justify-between flex-wrap'>
        {CreditItems.map((item) => (
          <Link key={item.alt} href={item.href} rel='noopener noreferrer'>
            <div className='text-center bg-secondary px-4 pt-[11px] pb-4 mb-2 md:mb-0 rounded-2xl transition-all duration-300 hover:shadow-lg'>
              <Image
                src={item.src}
                alt={item.alt}
                width={128}
                height={128}
                className='cursor-pointer hover:opacity-80 mx-auto'
              />
              <p className='text-black font-[500] text-[14px] mt-2'>
                {t(item.titleKey)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
