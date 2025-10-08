'use client';

import Image from 'next/image';
import { IOtpProps } from './constants';
import { useTranslation } from 'react-i18next';
import OTPInput from 'react-otp-input';
import { Button } from '@/sharedComponent/ui';
import { SpinnerDiv } from '../../SpinnerDiv/SpinnerDiv';
import { useOtp } from './hooks';

export const OtpModal: React.FC<IOtpProps> = ({
  setIsOpenOtpModal,
  setIsOpenLoginModal,
}) => {
  const { t } = useTranslation();

  const { phone, otp, setOtp, isSubmitting, error, handleSubmit } = useOtp(() =>
    setIsOpenOtpModal(false),
  );

  const handleBack = () => {
    setIsOpenOtpModal(false);
    setIsOpenLoginModal(true);
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-lg w-[320px]  md:w-100 p-8 relative animate-fadeIn'>
        <div className='flex items-center justify-start mb-2'>
          <button onClick={handleBack} className='cursor-pointer'>
            <Image
              src='/assets/icons/back-button.svg'
              alt='close-button'
              width={24}
              height={24}
              className='cursor-pointer hover:opacity-80'
            />
          </button>

          <h2 className='text-[18px] font-[700] '>
            {t('login:verification_code')}
          </h2>
        </div>
        <p className='text-[12px] font-[600]  text-[#323232] mb-6'>
          {t('login:enter_otp_message', { phone })}
        </p>
        <div dir='ltr' className='flex justify-center mb-6'>
          <OTPInput
            value={otp}
            onChange={(val) => setOtp(val.replace(/[^0-9]/g, ''))}
            numInputs={6}
            inputType='tel'
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
            renderInput={(props) => (
              <input
                {...props}
                dir='ltr'
                inputMode='numeric'
                className={`text-center text-lg border rounded-lg outline-0 mx-1
                  ${
                    error
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-blue-500'
                  }
                `}
                style={{
                  width: '44px',
                  height: '44px',
                  margin: '0px',
                }}
              />
            )}
          />
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        <Button
          onClick={handleSubmit}
          type='submit'
          disabled={otp.length !== 6 || isSubmitting}
          className='w-full'
        >
          {isSubmitting ? (
            <SpinnerDiv size='sm' className='text-white' />
          ) : (
            t('login:login')
          )}
        </Button>
      </div>
    </div>
  );
};
