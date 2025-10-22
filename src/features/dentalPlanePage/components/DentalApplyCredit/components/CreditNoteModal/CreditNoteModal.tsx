'use client';

import { Button } from '@/sharedComponent/ui';
import { useTranslation } from 'react-i18next';

export const CreditNoteModal = ({
  handleCredit,
}: {
  handleCredit: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className='p-4'>
      <div className='max-w-[600px] border-b-1 border-[var(--second-border-gray)]'>
        <p className='text-black font-[500] text-[16px] '>
          {t('credit:process_amount_credit')}
        </p>
      </div>
      <div className='flex justify-end mt-2'>
        <Button className='w-[99px]' onClick={handleCredit}>
          {t('credit:inquiry')}
        </Button>
      </div>
    </div>
  );
};
