'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { CreditItems } from './constants/CreditItems';
import Link from 'next/link';

export const CreditPlans = () => {
  const { t } = useTranslation();

  return (
    <div className='mx-auto max-w-4xl mb-12'>
      <h2 className='text-[16px] font-[700] text-black mb-4'>
        {t('home:credit_plans')}
      </h2>

      <div className='flex justify-between flex-wrap px-6 md:px-0'>
        {CreditItems.map((item) => (
          <Link key={item.alt} href={item.href} rel='noopener noreferrer'>
            <div className='text-center bg-secondary px-4 pt-[11px] pb-4 mb-2 md:mb-0 rounded-2xl'>
              <Image
                src={item.src}
                alt={item.alt}
                width={128}
                height={128}
                className='cursor-pointer hover:opacity-80'
              />
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
