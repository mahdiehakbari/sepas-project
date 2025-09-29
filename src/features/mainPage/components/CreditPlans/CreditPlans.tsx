'use client';
import { useTranslation } from 'react-i18next';

export const CreditPlans = () => {
  const { t } = useTranslation();

  return (
    <div className='mx-auto max-w-6xl'>
      <h2 className='text-[16px] font-[700] text-black mb-4'>
        {t('home:credit_plans')}
      </h2>
    </div>
  );
};
