'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const DentalPlaneContent = () => {
  const { t } = useTranslation();
  return (
    <div className='mb-12'>
      <p className='font-[400] text-[14px] mb-12'>
        {t('dental_plane:dental_plane_desc')}
      </p>

      <div className='mb-4'>
        <h3 className='font-[700] text-[14px] mb-4'>
          {t('dental_plane:conditions_receiving')}
        </h3>
        <div className='flex items-center gap-1 mb-2'>
          <p className='font-[400] text-[14px]'>
            {t('dental_plane:install_budget_app')}
          </p>
          <Link href='#' className='text-primary cursor-pointer'>
            {t('dental_plane:click_here')}
          </Link>
        </div>
        <p className='font-[400] text-[14px]'>
          {t('dental_plane:after_receiving_credit')}
        </p>
      </div>
    </div>
  );
};
