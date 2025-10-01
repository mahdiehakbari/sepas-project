'use client';
import { useTranslation } from 'react-i18next';
import { DentalBanner } from './DentalBanner';

export const DentalPlaneContent = () => {
  const { t } = useTranslation();
  return (
    <div className='mb-11'>
      <DentalBanner />
      <p className='font-[400] text-[14px]'>
        {t('dental_plane:dental_plane_desc')}
      </p>
    </div>
  );
};
