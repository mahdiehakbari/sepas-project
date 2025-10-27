'use client';
import { API_CUSTOMER_CREDIT_COMMAND } from '@/config/api_address.config';
import { formatTime } from '@/sharedComponent/lib';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OTPInput from 'react-otp-input';
import Cookies from 'js-cookie';

export const OtpPaymentReceipt = ({
  setPaymentReceiptStep,
  creditRequestId,
}: {
  setPaymentReceiptStep: (value: number) => void;
  creditRequestId: string;
}) => {
  const { t } = useTranslation();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const token = Cookies.get('token');

  const handleResend = async () => {
    setOtp('');
    setTimeLeft(120);
    setCanResend(false);
    setApiError('');
    // try {
    //   await sendOtp({ phoneNumber: phone });
    // } catch (err: unknown) {
    //   if (axios.isAxiosError(err)) {
    //     setApiError(err.response?.data?.message);
    //   }
    // }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSendOtp = () => {
    setButtonLoading(true);
    // axios
    //   .post(
    //     `${API_CUSTOMER_CREDIT_COMMAND}/${creditRequestId}/process-bajet-payment`,
    //     {
    //       bajetOtp: otp,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     setButtonLoading(false);
    //     console.log(response.data);
    //   })
    //   .catch(() => {
    //     setButtonLoading(false);
    //   });
    setPaymentReceiptStep(3);
  };

  return (
    <>
      <div className='md:w-[600px] flex flex-col items-center justify-center py-6 px-8'>
        <p className='text-[12px] font-[600] text-black mb-6'>
          {t('credit:code_sent')}
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
          <span className='text-[#A5A5A5] text-[12px] font-[700]'>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      <div className=' border-t border-secondary py-2 px-4 flex justify-end'>
        <Button disabled={otp.length != 6} onClick={handleSendOtp}>
          {buttonLoading ? (
            <SpinnerDiv size='sm' className='text-white' />
          ) : (
            t('credit:confirmation')
          )}
        </Button>
      </div>
    </>
  );
};
