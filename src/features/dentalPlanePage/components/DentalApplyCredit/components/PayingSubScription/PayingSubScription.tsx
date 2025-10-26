'use client';

import { useTranslation } from 'react-i18next';
import { BankOption } from '../BankOption/BankOption';
import { useState } from 'react';
import { Button } from '@/sharedComponent/ui';
import { IPayingSubscriptionProps } from './types';

export const PayingSubScription = ({
  feePercentage,
  amountReceivedValue,
  setIsOpenModal,
  setShowCreditNoteModal,
  setShowBill,
  setBudgetData,
  setPaymentReceiptStep,
}: IPayingSubscriptionProps) => {
  const { t } = useTranslation();
  const [selectedBank, setSelectedBank] = useState('saman');

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setShowCreditNoteModal(true);
    setShowBill(false);
    setBudgetData(null);
  };

  return (
    <div className='md:w-[600px] p-4'>
      <div className='flex items-center justify-between mb-8'>
        <p className='text-black font-[500] text-[16px]'>
          {t('credit:project_name')}
        </p>
        <p className='text-black font-[500] text-[16px]'>دندان پزشکی</p>
      </div>
      <div className='flex items-center justify-between mb-8'>
        <p className='text-black font-[500] text-[16px]'>
          {t('credit:loan_amount_received')}
        </p>
        <p className='text-black font-[500] text-[16px]'>
          {amountReceivedValue.toLocaleString('fa-IR')} {t('credit:rial')}
        </p>
      </div>
      <div className='flex items-center justify-between mb-6 px-4 py-2 bg-[var(--second-light-primary)] rounded-[8px]'>
        <p className='text-black font-[500] text-[16px]'>
          {t('credit:paid_subscription')}
        </p>
        <p className='text-black font-[500] text-[16px]'>
          {feePercentage.toLocaleString('fa-IR')} {t('credit:rial')}
        </p>
      </div>

      <div className=' border-t border-dashed'>
        <p className='text-black font-[500] text-[16px]  pt-2 pb-6'>
          {t('credit:paid_subscription')}
        </p>
      </div>

      <BankOption
        value='saman'
        label={t('credit:saman_bank')}
        logo='/assets/dental-plane/saman-bank-logo.svg'
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
      />
      <div className=' border-t border-secondary py-2 px-4 flex justify-between mt-10'>
        <Button variant='outline' onClick={handleCloseModal}>
          {t('credit:canceled')}
        </Button>
        <Button onClick={() => setPaymentReceiptStep(1)}>
          {t('credit:confirmation')}
        </Button>
      </div>
    </div>
  );
};
