'use client';

import { FormTitle } from '@/sharedComponent/ui';
import { useTranslation } from 'react-i18next';
import { IShowUserDataProps } from './types';

export const ShowUserData: React.FC<IShowUserDataProps> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className='bg-[var(--block-color)] rounded-2xl p-6 '>
      <FormTitle title={t('profile:identity_information')} />
      <div className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>نام:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.firstName}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              نام خانوادگی:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.lastName}
            </p>
          </div>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              شماره موبایل:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.mobile}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>کد ملی:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.nationalId}
            </p>
          </div>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>تاریخ تولد:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.birthDate}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>جنسیت:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.gender == '2' ? 'زن' : 'مرد'}
            </p>
          </div>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>ایمیل:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.email || '-'}
            </p>
          </div>
        </div>

        <FormTitle title={t('profile:bank_information')} />
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex justify-between items-center  mb-6 pl-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>شماره شبا:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.iban || '-'}
            </p>
          </div>
        </div>
        <FormTitle title={t('profile:address_information')} />
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>استان:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.province}
            </p>
          </div>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>شهر:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.cityId}
            </p>
          </div>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>کدپستی:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.postalCode}
            </p>
          </div>
          <div className='col-span-2 flex items-center gap-3'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>آدرس:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.addressDetails}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
