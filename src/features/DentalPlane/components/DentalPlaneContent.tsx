'use client';
import { useTranslation } from 'react-i18next';

export const DentalPlaneContent = () => {
  const { t } = useTranslation();
  return (
    <div className='max-w-4xl mx-auto'>
      <p className='font-[400] text-[14px]'>{t('dental_plane:dental_plane')}</p>
    </div>
  );
};
