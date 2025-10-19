'use client';

import Image from 'next/image';
import { useState } from 'react';
import { tabsItem } from './constants';
import { useTranslation } from 'react-i18next';

export const DentalApplyCredit = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='mb-12'>
      <h2 className='font[700] text-[24px] mb-4'>
        {t('dental_plane:dental_plan_credit')}
      </h2>

      <div className='flex overflow-x-auto scrollbar-none border-2 border-border-color bg-white rounded-[8px] px-4 py-4 gap-3 md:gap-12'>
        {tabsItem.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 flex justify-center items-center py-2 px-6 rounded-[12px] font-medium transition-all duration-300 cursor-pointer
              ${index === activeIndex ? 'bg-active-tab-color' : 'bg-white'}
            `}
          >
            <div className='flex items-center gap-[4px]'>
              <Image
                src={tab.tabImage}
                alt={`tab-${index}`}
                width={59}
                height={50}
                className={`transition-opacity duration-300 ${
                  index === activeIndex
                    ? 'opacity-100'
                    : 'opacity-40 hover:opacity-70'
                }`}
              />
              <h3
                className={`${
                  index === activeIndex
                    ? 'text-black font-[700] text-[16px]'
                    : 'font-[500] text-[16px] opacity-40'
                }`}
              >
                {t(tab.label)}
              </h3>
            </div>
          </button>
        ))}
      </div>

      <div className='mt-4 transition-all duration-300'>
        {tabsItem[activeIndex].content}
      </div>
    </div>
  );
};
