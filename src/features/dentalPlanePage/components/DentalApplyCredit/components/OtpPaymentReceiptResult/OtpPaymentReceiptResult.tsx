'use client';

import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IOtpPaymentReceiptResult } from './types';

export const OtpPaymentReceiptResult = ({
  setIsOpenModal,
  setShowCreditNoteModal,
  setShowBill,
  setBudgetData,
  setPaymentReceiptStep,
}: IOtpPaymentReceiptResult) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setIsOpenModal(false);
    setShowCreditNoteModal(true);
    setShowBill(false);
    setBudgetData(null);
    setPaymentReceiptStep(0);
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
        <p className='text-[20px] font-[700] text-[var(--active-loan-text)] mb-6'>
          {t('credit:request_successfully')}
        </p>{' '}
        <p className='text-[16px] font-[500] text-[#6A6A6A] leading-7'>
          {t('credit:approved_by_bank')}
        </p>
      </div>
      <div className=' border-t border-secondary py-2 px-4 flex justify-between'>
        <Button variant='outline' onClick={handleClose}>
          {t('credit:close')}
        </Button>
        <Button disabled>{t('credit:list_requests')}</Button>
      </div>
    </>
  );
};
