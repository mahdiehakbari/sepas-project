'use client';

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

        <Image
          src='/assets/icons/success-icon.svg'
          alt='dental-plane'
          width={64}
          height={64}
          className='mb-8'
        />

        <p className=''>{status == 'canceled' ? 'joi' : 'ssss'}</p>
      </div>
    </div>
  );
}
