'use client';

import { useTranslation } from 'react-i18next';

export const InquiringBudget = () => {
  const { t } = useTranslation();
  const price = 200000000;
  const formattedPrice = price.toLocaleString('fa-IR');
  return (
    <div className='md:w-[600px] p-4'>
      <div className='flex items-center justify-between bg-[var(--second-light-primary)] px-4 py-2 rounded-2xl mb-4'>
        <p className='text-black font-[500] text-[16px]'>
          {t('credit:approved_credit_amount')}
        </p>
        <p className='text-black font-[500] text-[16px]'>
          {formattedPrice} {t('credit:toman')}
        </p>
      </div>
      <div className='flex items-center justify-between bg-[var(--bg-gray)] px-4 py-2 rounded-2xl mb-4'>
        <p className='text-black font-[400] text-[16px]'>
          {t('credit:amount_credit_requesting')}
        </p>
      </div>
    </div>
  );
};
