import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { useOtp } from './hooks';
import Image from 'next/image';
import { Trans, useTranslation } from 'react-i18next';
import { IOtpProps } from './constants';
import Link from 'next/link';
import { useSendOtp } from '../PhoneNumber/hooks';
import axios from 'axios';
import { formatTime } from '@/sharedComponent/lib';
import { toast } from 'react-toastify';

export const OtpModal: React.FC<IOtpProps> = ({
  setIsOpenOtpModal,
  setIsOpenLoginModal,
  setIsOpenModal,
  setShowProfileModal,
  name,
}) => {
  const { t } = useTranslation();

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const { sendOtp } = useSendOtp();
  const [apiError, setApiError] = useState('');
  const handleClose = () => {
    if (name == 'credit' && setShowProfileModal) {
      setShowProfileModal(true);
    } else {
      setIsOpenModal(false);
    }
  };

  const { phone, otp, setOtp, isSubmitting, error, handleSubmit } =
    useOtp(handleClose);
  const handleBack = () => {
    setIsOpenOtpModal(false);
    setIsOpenLoginModal(true);
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    setOtp('');
    setTimeLeft(120);
    setCanResend(false);
    setApiError('');
    try {
      await sendOtp({ phoneNumber: phone });
      toast.success(t('home:resend_otp'));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <div className='p-8'>
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

        <h2 className='text-[18px] font-bold '>
          {t('login:verification_code')}
        </h2>
      </div>

      <p className='text-[12px] font-semibold text-[#323232] mb-6'>
        {t('login:enter_otp_message', { phone })}
      </p>
      <div className=' mb-6'>
        <div dir='ltr' className='flex justify-center'>
          <OTPInput
            value={otp}
            onChange={(val) => setOtp(val.replace(/[^0-9]/g, ''))}
            numInputs={6}
            inputType='tel'
            shouldAutoFocus
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
            renderInput={(props, index) => (
              <input
                {...props}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                dir='ltr'
                inputMode='numeric'
                className={`text-center text-lg border rounded-lg outline-none transition-all duration-150
                  ${
                    error
                      ? 'border-red-500'
                      : focusedIndex === index
                      ? 'border-blue-500 ring-1 ring-blue-400'
                      : 'border-gray-300'
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

        {error && <p className='text-red-500 text-sm my-2 mr-4'>{error}</p>}
        {apiError && (
          <p className='text-red-500 text-sm my-2 mr-4'>{apiError}</p>
        )}
      </div>

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
      <div className='flex justify-center items-center mt-4 gap-2 text-sm'>
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`cursor-pointer font-semibold ${
            canResend
              ? 'text-primary hover:underline'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {t('login:resend_code')}
        </button>
        <span className='text-[#A5A5A5] text-[12px] font-bold'>
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* <div className='text-center text-xs text-gray-600 mt-4 leading-relaxed'>
        <Trans
          i18nKey='login:accept_terms_message'
          components={[
            <></>,
            <Link
              key='terms-link'
              href='/rules'
              target='_blank'
              className='text-primary underline font-medium '
            />,
          ]}
        />
      </div> */}
    </div>
  );
};
