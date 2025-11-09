'use client';
import Image from 'next/image';
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
        <div className='md:flex items-center gap-1 mb-2'>
          <span className='font-[400] text-[14px]'>
            {t('dental_plane:install_budget_app')}
          </span>
          <Link href='https://mybajet.ir/#download-target' className='text-primary cursor-pointer'>
            {t('dental_plane:click_here')}
          </Link>
        </div>
        <p className='font-[400] text-[14px]'>
          {t('dental_plane:after_receiving_credit')}
        </p>
      </div>

      <div className='py-2 px-10 bg-secondary rounded-2xl mb-4'>
        <h3 className='font-[700] text-[14px] mb-2 text-[var(--second-primary)]'>
          {t('dental_plane:conditions_receiving')}
        </h3>
        <ul className='list-disc px-7 font-[400] text-[14px]'>
          <li className='mb-2'>{t('dental_plane:note_fee_amount')}</li>
          <li>{t('dental_plane:note_without_paying')}</li>
        </ul>
      </div>

      <p className='font-[400] text-[14px] mb-4'>
        {t('dental_plane:after_paying')}
      </p>

      <div className='px-10 mb-4'>
        <h3 className='font-[700] text-[14px] mb-2 text-[var(--notice-title)]'>
          {t('dental_plane:conditions_receiving')}
        </h3>
        <ul className='list-disc px-7 font-[400] text-[14px]'>
          <li className='mb-2'>{t('dental_plane:password_correctly')}</li>
          <li>{t('dental_plane:dont_receive_code')}</li>
        </ul>
      </div>

      <div className='py-2 px-4 bg-[var(--light-primary)] rounded-2xl mb-4 flex items-center gap-4 border border-[var(--primary-border)]'>
        <Image
          src='/assets/icons/notice-icon.svg'
          alt='logo'
          width={20}
          height={20}
        />
        <p className='font-[400] text-[14px] text-[var(--second-primary)]'>
          {t('dental_plane:constitutes_receiving_credit')}
        </p>
      </div>
      <p className='font-[400] text-[14px] mb-4'>
        {t('dental_plane:bank_announces')}
      </p>
    </div>
  );
};
