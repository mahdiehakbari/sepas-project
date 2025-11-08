'use client';

import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

export default function PaymentResult() {
  const { t } = useTranslation();
  const [paymentData, setPaymentData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cookie = Cookies.get('payment_result');
    if (cookie) {
      try {
        setPaymentData(JSON.parse(cookie));
      } catch (err) {
        console.error('Invalid cookie data', err);
      }
    }
  }, []);

  // if (!paymentData) {
  //   return (
  //     <div className='flex flex-col items-center justify-center py-16'>
  //       <p className='text-gray-500'>در حال بارگذاری نتیجه پرداخت...</p>
  //     </div>
  //   );
  // }

  // const { success, rrn, amount } = paymentData;

  // const handleRetry = () => {
  //   router.push('/services/dentalPlan');
  // };

  // const isFailed = status === 'false';

  // const handleCredit = () => {
  //   localStorage.removeItem('payment_modal_shown');
  //   Cookies.set('payment_result', JSON.stringify(paymentData), { expires: 1 });
  //   router.push('/services/dentalPlan');
  // };

  return (
    <div className='flex flex-col items-center justify-center '>
      {paymentData}
      {/* <div className='md:w-[600px] flex flex-col items-center justify-center'>
        <h2 className='font-bold text-[20px] text-black border-b border-border-color text-center pb-2 mb-6  w-full'>
          {t('payment:payment_receipt')}
        </h2>

        <Image
          src={
            isFailed
              ? '/assets/icons/close-circle.svg'
              : '/assets/icons/success-icon.svg'
          }
          alt='payment-status'
          width={64}
          height={64}
          className='mb-8'
        />

        <p
          className={`font-medium text-[16px] mb-8 ${
            isFailed
              ? 'text-[var(--error-color)]'
              : 'text-[var(--second-green)]'
          }`}
        >
          {isFailed
            ? t('payment:payment_failed')
            : t('payment:payment_successful')}
        </p>

        {isFailed ? (
          <>
            <p className='font-medium text-[16px] text-black pb-8 border-b border-border-color w-full text-center'>
              {t('payment:debited')}
            </p>
            <div className='w-full border-t border-secondary py-2  flex justify-between'>
              <Button disabled variant='outline'>
                {t('payment:contact_support')}
              </Button>
              <Button onClick={handleRetry}>{t('payment:retry')}</Button>
            </div>
          </>
        ) : (
          <>
            <div className='flex justify-between items-center w-full mb-8'>
              <p className='font-medium text-[16px] text-black'>
                {t('payment:tracking_number')}
              </p>
              <p className='font-medium text-[16px] text-black'>{rrn}</p>
            </div>

            <div className='flex justify-between items-center w-full pb-8 border-b border-border-color'>
              <p className='font-medium text-[16px] text-black'>
                {t('payment:payment_date')}
              </p>
              <p className='font-medium text-[16px] text-black'>{amount}</p>
            </div>

            <div className='w-full border-t border-secondary py-2  flex justify-between'>
              <Button variant='outline' onClick={handleCredit}>
                {t('payment:receive_credit')}
              </Button>
              <Button disabled>{t('payment:download_receipt')}</Button>
            </div>
          </>
        )}
      </div> */}
    </div>
  );
}
