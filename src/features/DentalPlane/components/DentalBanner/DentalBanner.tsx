'use client';
import { Button } from '@/sharedComponent/ui';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const DentalBanner = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-second-blue px-8 py-4 md:flex items-center justify-between mb-12 rounded-2xl'>
      <div>
        <h1 className='text-[32px] font-[700] text-black mb-4'>
          {t('dental_plane:Dental_plan')}
        </h1>

        <p className='text-[20px] font-[400] text-second-text-color mb-6'>
          {t('dental_plane:loan')}
        </p>

        <Button size='lg' className='md:mb-0 mb-4'>
          {t('dental_plane:calculating_dental_installments')}
        </Button>
      </div>
      <Image
        src='/assets/dental-plane/dental-banner-image.svg'
        alt='dental-plane'
        width={312}
        height={196}
        className='cursor-pointer hover:opacity-80 w-[200px] h-[120px] md:w-[312px] md:h-[196px]'
      />
    </div>
  );
};
