'use client';

import Image from 'next/image';
import { useState, ReactNode } from 'react';

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export const DentalApplyCredit = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      tabImage: '/assets/dental-plane/tejarat_bank_logo.svg',
      content: <p>محتوای تب اول</p>,
    },
    {
      tabImage: '/assets/dental-plane/saman-bank-logo.svg',
      content: <p>محتوای تب دوم</p>,
    },
    {
      tabImage: '/assets/dental-plane/meli-bank-logo.svg',
      content: <p>محتوای تب سوم</p>,
    },
  ];
  return (
    <div className='mb-12'>
      <div className='flex bg-gray-100 rounded-xl p-1 gap-2'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-1 flex justify-center items-center py-3 rounded-xl font-medium transition-all duration-300
              ${index === activeIndex ? 'bg-white shadow' : 'bg-gray-100'}
            `}
          >
            <Image
              src={tab.tabImage}
              alt={`tab-${index}`}
              width={80}
              height={80}
              className={`transition-opacity duration-300
                ${
                  index === activeIndex
                    ? 'opacity-100'
                    : 'opacity-40 hover:opacity-70'
                }
              `}
            />
          </button>
        ))}
      </div>

      {/* محتوای تب فعال */}
      <div className='mt-4 transition-all duration-300'>
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};
