'use client';

import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { IInquiringBudgetProps } from './types';
import axios from 'axios';
import { API_CUSTOMER_CREDIT_COMMAND } from '@/config/api_address.config';
import Cookies from 'js-cookie';
import { minValue, step } from './constants';
import { toast } from 'react-toastify';

export const InquiringBudget = ({
  setShowBill,
  budgetData,
  budgetCalcData,
  setFeePercentage,
  feePercentage,
  setAmountReceivedValue,
  amountReceivedValue,
  setCreditRequestId,
  setBudgetData,
}: IInquiringBudgetProps) => {
  const { t } = useTranslation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const maxValue = budgetData;
  const [checked, setChecked] = useState(false);
  const token = Cookies.get('token');
  const formattedPrice = budgetData?.toLocaleString('fa-IR');
  const trackBg = '#ffffff';
  const filledColor = '#2690e0';
  const percent =
    maxValue === null || minValue === null
      ? 0
      : ((amountReceivedValue - minValue) / (maxValue - minValue)) * 100;
  const background = `linear-gradient(to right, ${filledColor} ${percent}%, ${trackBg} ${percent}%)`;

  const handleShowBill = () => {
    setShowBill(true);
    setButtonLoading(true);
    axios
      .post(
        API_CUSTOMER_CREDIT_COMMAND,
        {
          amount: amountReceivedValue,
          description: 'Credit request details',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        setCreditRequestId(resp.data.creditRequestId);
        setShowBill(true);
        setButtonLoading(false);
        setBudgetData(budgetData);
      })
      .catch(() => {
        setButtonLoading(false);
        toast.error(t('credit:active_request'));
      });
  };

  useEffect(() => {
    const config = budgetCalcData.find(
      (item) =>
        amountReceivedValue >= item.minAmount &&
        amountReceivedValue <= item.maxAmount,
    );
    const initialFee = config?.feePercentage
      ? (amountReceivedValue * config.feePercentage) / 100
      : 0;
    setFeePercentage(initialFee);
  }, [budgetCalcData]);

  return (
    <>
      <div className='md:w-[600px] p-4'>
        <div className='flex items-center justify-between bg-[var(--second-light-primary)] px-4 py-2 rounded-2xl mb-4'>
          <p className='text-black font-[500] text-[16px]'>
            {t('credit:approved_credit_amount')}
          </p>
          <p className='text-black font-[500] text-[16px]'>
            {formattedPrice} {t('credit:rial')}
          </p>
        </div>

        <div className='bg-[var(--bg-gray)] px-4 py-2 rounded-2xl mb-4'>
          <p className='text-black font-[400] text-[16px] mb-4'>
            {t('credit:amount_credit_requesting')}
          </p>
          <input
            type='range'
            min={minValue}
            max={maxValue ?? undefined}
            step={step}
            value={amountReceivedValue}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setAmountReceivedValue(newValue);

              const config = budgetCalcData.find(
                (item) =>
                  newValue >= item.minAmount && newValue <= item.maxAmount,
              );
              const newFee = config?.feePercentage
                ? (newValue * config.feePercentage) / 100
                : 0;
              setFeePercentage(newFee);
            }}
            className='w-full h-2 appearance-none rounded-full cursor-pointer'
            style={{ background }}
            dir='ltr'
          />

          <div className='flex items-center justify-between mb-4 mt-6'>
            <p className='text-black font-[400] text-[16px]'>
              {t('credit:credit_requested')}
            </p>
            <p className='text-black font-[500] text-[16px]'>
              {amountReceivedValue.toLocaleString('fa-IR')} {t('credit:rial')}
            </p>
          </div>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-black font-[400] text-[16px]'>
              {t('credit:subscription')}
            </p>
            <p className='text-black font-[500] text-[16px]'>
              {feePercentage.toLocaleString('fa-IR')} {t('credit:rial')}
            </p>
          </div>
        </div>

        <label className='flex items-center space-x-2 cursor-pointer mb-4'>
          <input
            type='checkbox'
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="
          appearance-none
          w-5 h-5
          rounded
          border border-gray-300
          cursor-pointer
          transition-all
          checked:bg-[#64B054]
          checked:border-[#64B054]
          relative
          before:content-['']
          before:absolute
          before:top-[2px]
          before:left-[6px]
          before:w-[5px]
          before:h-[10px]
          before:border-r-2
          before:border-b-2
          before:border-white
          before:rotate-45
          before:opacity-0
          checked:before:opacity-100
        "
          />

          <div className=' text-[16px] font-[500] text-black leading-relaxed'>
            <Trans
              i18nKey='credit:agree_terms'
              components={[
                <></>,
                <Link
                  key='terms-link'
                  href='/terms'
                  target='_blank'
                  className='text-primary underline font-medium '
                />,
              ]}
            />
          </div>
        </label>
      </div>
      <div className=' border-t border-secondary py-2 px-4 flex justify-end'>
        <Button disabled={!checked || buttonLoading} onClick={handleShowBill}>
          {buttonLoading ? (
            <SpinnerDiv size='sm' className='text-white' />
          ) : (
            t('credit:receive_credit')
          )}
        </Button>
      </div>
    </>
  );
};
