'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { CreditItems } from './constants/CreditItems';

export const CreditPlans = () => {
  const { t } = useTranslation();

  return (
    <div className='mx-auto max-w-4xl mb-12 px-6 md:px-0'>
      <h2 className='text-[16px] font-[700] text-black mb-4'>
        {t('home:credit_plans')}
      </h2>

      <div className='flex justify-between flex-wrap gap-4'>
        {CreditItems.map((item, index) => {
          const isActive = index === 0;

          return (
            <div key={item.alt} className='relative w-[128px]'>
              {isActive ? (
                <Link href={item.href} rel='noopener noreferrer'>
                  <div className='text-center bg-secondary px-4 pt-[11px] pb-4 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer'>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={128}
                      height={128}
                      className='mx-auto hover:opacity-80'
                    />
                    <p className='text-black font-[500] text-[14px] mt-2'>
                      {t(item.titleKey)}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className='text-center bg-secondary px-4 pt-[11px] pb-4 rounded-2xl relative'>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={128}
                    height={128}
                    className='mx-auto opacity-50'
                  />
                  <p className='text-[var(--text-disabled)] font-[500] text-[14px] mt-2'>
                    {t(item.titleKey)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
