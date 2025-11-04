'use client';

import { useTranslation } from 'react-i18next';
import { BankOption } from '../BankOption/BankOption';
import { useState } from 'react';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { IPayingSubscriptionProps } from './types';
import axios from 'axios';
import { API_CUSTOMER_CREDIT_COMMAND } from '@/config/api_address.config';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const PayingSubScription = ({
  feePercentage,
  amountReceivedValue,
  setIsOpenModal,
  setShowCreditNoteModal,
  setShowBill,
  setBudgetData,
  setPaymentReceiptStep,
  creditRequestId,
  setIpgTransactionId,
}: IPayingSubscriptionProps) => {
  const { t } = useTranslation();
  const [selectedBank, setSelectedBank] = useState('saman');
  const [buttonLoading, setButtonLoading] = useState(false);

  const token = Cookies.get('token');

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setShowCreditNoteModal(true);
    setShowBill(false);
    setBudgetData(null);
  };

  const router = useRouter();
  const handleConfirm = () => {
    setButtonLoading(true);

    axios
      .post(
        `${API_CUSTOMER_CREDIT_COMMAND}/${creditRequestId}/ipg-payment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        console.log(resp.data, 'hhhhhhhh');
        router.push(resp.data.paymentUrl);
        setIpgTransactionId(resp.data.ipgTransactionId);
        // setPaymentReceiptStep(1);
        setButtonLoading(false);
      })
      .catch(() => {
        setButtonLoading(false);
      });
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
        <Button
          onClick={handleConfirm}
          disabled={buttonLoading && !creditRequestId}
        >
          {buttonLoading ? (
            <SpinnerDiv size='sm' className='text-white' />
          ) : (
            t('credit:confirmation')
          )}
        </Button>
      </div>
    </div>
  );
};
