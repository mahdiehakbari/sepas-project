'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const BannerSection = () => {
  const { t } = useTranslation();
  return (
    <div className='relative w-full h-[382px] -mt-14'>
      <Image
        src='/assets/icons/banner.svg'
        alt='banner'
        fill
        className='object-cover'
      />
    </div>
  );
};

export default BannerSection;
