'use client';

import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentResult {
  status: string | null;
  rrn: string | null;
  message: string | null;
  amount: string | null;
  creditRequestId?: string | null;
  ipgTransactionId?: string | null;
}

export default function PaymentResultPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();

  const [result, setResult] = useState<PaymentResult | null>(null);

  useEffect(() => {
    const data: PaymentResult = {
      status: params.get('status'),
      rrn: params.get('rrn'),
      message: params.get('message'),
      amount: params.get('amount'),
      creditRequestId: params.get('creditRequestId'),
      ipgTransactionId: params.get('ipgTransactionId'),
    };

    setResult(data);
    try {
      localStorage.setItem('payment_result', JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save payment result to localStorage', err);
    }
  }, [params]);

  const handleRetry = () => {
    router.push(
      `/services/dentalPlan?requestId=${result?.creditRequestId}&&type=1`,
    );
  };

  const handleCredit = () => {
    localStorage.removeItem('payment_modal_shown');
    router.push(
      `/services/dentalPlan?requestId=${result?.creditRequestId}&&type=2`,
    );
  };

  if (!result) {
    return (
      <div className='flex flex-col items-center justify-center py-16'>
        <p className='text-gray-500'>{t('payment:loading_result')}</p>
      </div>
    );
  }

  const isFailed = result.status === 'false';

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='md:w-[600px] flex flex-col items-center justify-center'>
        <h2 className='font-bold text-[20px] text-black border-b border-border-color text-center pb-2 mb-6 w-full'>
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
            <div className='w-full border-t border-secondary py-2 flex justify-between'>
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
              <p className='font-medium text-[16px] text-black'>
                {result.rrn || '---'}
              </p>
            </div>

            <div className='w-full border-t border-secondary py-2 flex justify-between'>
              <Button variant='outline' onClick={handleCredit}>
                {t('payment:receive_credit')}
              </Button>
              <Button disabled>{t('payment:download_receipt')}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
