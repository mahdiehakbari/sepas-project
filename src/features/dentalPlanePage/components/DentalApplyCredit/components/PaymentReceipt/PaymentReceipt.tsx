'use client';
import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IPaymentReceiptProps } from './types';

export const PaymentReceipt = ({
  setPaymentReceiptStep,
}: IPaymentReceiptProps) => {
  const { t } = useTranslation();
  const handleReceiveCredit = () => {
    setPaymentReceiptStep(2);
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
        <Button variant='outline' onClick={handleReceiveCredit}>
          {t('credit:receive_credit')}
        </Button>
        <Button disabled>{t('credit:download_receipt')}</Button>
      </div>
    </>
  );
};
