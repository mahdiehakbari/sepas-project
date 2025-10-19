'use client';

import Image from 'next/image';
import { IPhoneNumberModalProps, TFormValues } from './constants';
import { useTranslation } from 'react-i18next';
import { Button } from '@/sharedComponent/ui';
import { useForm } from 'react-hook-form';
import { usePhoneNumber } from './hooks/usePhoneNumber';
import { SpinnerDiv } from '../../SpinnerDiv/SpinnerDiv';
import { usePhoneNumberSubmit } from './hooks';

export const PhoneNumberModal: React.FC<IPhoneNumberModalProps> = ({
  setIsOpenLoginModal,
  setIsOpenOtpModal,
}) => {
  const { t } = useTranslation();

  const { register, handleSubmit, setValue } = useForm<TFormValues>({
    defaultValues: { phoneNumber: '' },
  });

  const { handleChange, isValid } = usePhoneNumber(setValue);

  const { onSubmit, loading, error } = usePhoneNumberSubmit({
    setIsOpenLoginModal,
    setIsOpenOtpModal,
  });

  return (
    <div className='p-8 max-w-[431px]'>
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

      <div className='flex justify-center mb-4'>
        <Image
          src='/assets/icons/logo.svg'
          alt='logo'
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

      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='flex items-center gap-1 mb-2'>
          <p className='text-[14px] font-[500] text-[#494A50]'>
            {t('login:phone_number')}
          </p>
          <p className='text-[14px] font-[500] text-[#ff4b4b]'>*</p>
        </div>

        <input
          type='tel'
          placeholder='09*********'
          {...register('phoneNumber')}
          onChange={handleChange}
          maxLength={11}
          className={`w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <Button
          type='submit'
          disabled={!isValid || loading}
          className='w-full flex items-center justify-center gap-2'
        >
          <span>
            {loading ? (
              <SpinnerDiv size='sm' className='text-white' />
            ) : (
              t('login:receive_verification_code')
            )}
          </span>
        </Button>
      </form>
    </div>
  );
};
