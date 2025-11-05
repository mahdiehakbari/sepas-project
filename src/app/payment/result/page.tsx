'use client';

import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function PaymentResult() {
  const params = useSearchParams();
  const status = params.get('status') || 'unknown';
  const trackId = params.get('trackId') || '';
  const message = params.get('message') || '';
  const amount = params.get('amount') || '0';
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='md:w-[600px] flex flex-col items-center justify-center'>
        <h2 className='font-bold text-[20px] text-black border-b border-border-color text-center pb-2 mb-6  w-100'>
          {t('payment:payment_receipt')}
        </h2>
        {status == 'canceled' ? (
          <Image
            src='/assets/icons/close-circle.svg'
            alt='dental-plane'
            width={64}
            height={64}
            className='mb-8'
          />
        ) : (
          <Image
            src='/assets/icons/success-icon.svg'
            alt='dental-plane'
            width={64}
            height={64}
            className='mb-8'
          />
        )}

        <p
          className={`font-medium text-[16px] mb-8 ${
            status == 'canceled'
              ? 'text-[var(--error-color)]'
              : 'text-[var(--second-green)]'
          }`}
        >
          {status == 'canceled'
            ? t('payment:payment_failed')
            : t('payment:payment_successful')}
        </p>
        {status == 'canceled' && (
          <>
            <p className='font-medium text-[16px] text-black pb-8 border-b border-border-color w-full text-center'>
              {t('payment:debited')}
            </p>

            <div className='w-full border-t border-secondary py-2  flex justify-between'>
              <Button variant='outline'>{t('payment:contact_support')}</Button>
              <Button>{t('payment:retry')}</Button>
            </div>
          </>
        )}
        {status !== 'canceled' && (
          <>
            <div className='flex justify-between items-center w-full mb-8'>
              <p className='font-medium text-[16px] text-black'>
                {t('payment:tracking_number')}
              </p>
              <p className='font-medium text-[16px] text-black'></p>
            </div>
            <div className='flex justify-between items-center w-full pb-8 border-b border-border-color'>
              <p className='font-medium text-[16px] text-black'>
                {t('payment:payment_date')}
              </p>
              <p className='font-medium text-[16px] text-black'></p>
            </div>

            <div className='w-full border-t border-secondary py-2  flex justify-between'>
              <Button variant='outline'>{t('payment:receive_credit')}</Button>
              <Button disabled>{t('payment:download_receipt')}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
