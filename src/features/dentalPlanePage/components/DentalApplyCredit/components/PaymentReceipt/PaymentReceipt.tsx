'use client';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IPaymentReceiptProps } from './types';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { API_CUSTOMER_CREDIT_COMMAND } from '@/config/api_address.config';

export const PaymentReceipt = ({
  setPaymentReceiptStep,
  creditRequestId,
}: IPaymentReceiptProps) => {
  const { t } = useTranslation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const token = Cookies.get('token');

  const handleReceiveCredit = () => {
    setPaymentReceiptStep(2);
    // axios
    //   .post(
    //     `${API_CUSTOMER_CREDIT_COMMAND}/${creditRequestId}/complete-ipg-payment`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   )
    //   .then((resp) => {
    //     console.log(resp.data, 'vvvv');
    //     setPaymentReceiptStep(2);
    //     setButtonLoading(false);
    //   })
    //   .catch(() => {
    //     setButtonLoading(false);
    //   });
  };
  return (
    <>
      <div className='md:w-[600px] flex flex-col items-center justify-center py-6 px-8'>
        <Image
          src='/assets/icons/success-icon.svg'
          alt='dental-plane'
          width={64}
          height={64}
          className='mb-8'
        />
        <p className='text-[16px] font-[500] text-[var(--second-green)] mb-6'>
          {t('credit:successful_payment')}
        </p>
        <div className='flex items-center justify-between mb-8 w-full'>
          <p className='text-[16px] font-[500] text-black'>
            {t('credit:tracking_number')}
          </p>
          <p className='text-[16px] font-[500] text-black'>۱۳۷۲۲۵۴</p>
        </div>
        <div className='flex items-center justify-between mb-8 w-full'>
          <p className='text-[16px] font-[500] text-black'>
            {t('credit:payment_date')}
          </p>
          <p className='text-[16px] font-[500] text-black'>۱۴۰۴/۱۲/۰۳ ۱۲:۳۴</p>
        </div>
      </div>

      <div className=' border-t border-secondary py-2 px-4 flex justify-between mt-10'>
        <Button
          variant='outline'
          disabled={buttonLoading}
          onClick={handleReceiveCredit}
        >
          {buttonLoading ? (
            <SpinnerDiv size='sm' className='text-white' />
          ) : (
            t('credit:receive_credit')
          )}
        </Button>
        <Button disabled>{t('credit:download_receipt')}</Button>
      </div>
    </>
  );
};
