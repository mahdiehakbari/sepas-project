'use client';

import Image from 'next/image';
import { IPhoneNumberModalProps } from './constants';
import { useTranslation } from 'react-i18next';

export const PhoneNumberModal: React.FC<IPhoneNumberModalProps> = ({
  setIsOpenLoginModal,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpenLoginModal(false);
      }}
    >
      <div className='bg-white rounded-2xl shadow-lg w-96 p-8 relative animate-fadeIn'>
        <div className='flex items-center justify-end mb-6'>
          <button
            onClick={() => setIsOpenLoginModal(false)}
            className='cursor-pointer'
          >
            <Image
              src='/assets/icons/close-button.svg'
              alt='close-button'
              width={24}
              height={24}
              className='cursor-pointer hover:opacity-80'
            />
          </button>
        </div>

        <div className='mt-4'>
          <div className='flex justify-center mb-4'>
            <Image
              src='/assets/icons/logo.svg'
              alt='close-button'
              width={78}
              height={42}
              className='cursor-pointer hover:opacity-80'
            />
          </div>
          <h2 className='text-[18px] font-[700] mb-2 text-center'>
            {t('login:login_user_account')}
          </h2>
          <p className='text-[14px] font-[500] text-[#323232] mb-6 text-center'>
            {t('login:enter_mobile')}
          </p>

          <div className='flex items-center gap-1 mb-2'>
            <p className='text-[14px] font-[500] text-[#494A50]'>
              {t('login:phone_number')}
            </p>
            <p className='text-[14px] font-[500] text-[#ff4b4b]'>*</p>
          </div>

          <input
            type='tel'
            placeholder='09*********'
            className='w-full border border-gray-300 rounded-lg p-2  mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
            کد تایید
          </button>
        </div>
      </div>
    </div>
  );
};
