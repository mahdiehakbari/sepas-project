'use client';

import { Button, PageSpinner } from '@/sharedComponent/ui';
import { useTranslation } from 'react-i18next';
import { ICreditNoteModalProps } from './types';

export const CreditNoteModal: React.FC<ICreditNoteModalProps> = ({
  handleBudgetLoading,
  creditLoading,
}) => {
  const { t } = useTranslation();
  console.log(creditLoading, 'creditLoading');
  return (
    <>
      {creditLoading == false ? (
        <div className='p-4'>
          <div className='max-w-[600px] border-b-1 border-[var(--second-border-gray)]'>
            <p className='text-black font-[500] text-[16px] '>
              {t('credit:process_amount_credit')}
            </p>
          </div>
          <div className='flex justify-end mt-2'>
            <Button className='w-[99px]' onClick={handleBudgetLoading}>
              {t('credit:inquiry')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center  bg-white py-10 md:w-[700px]'>
          <PageSpinner />

          <p className='text-primary font-[700] text-[20px] my-4'>
            {t('credit:inquiring_budget')}
          </p>
          <p className='text-black font-[500] text-[16px] text-center'>
            {t('credit:please_wait')}
          </p>
        </div>
      )}
    </>
  );
};
