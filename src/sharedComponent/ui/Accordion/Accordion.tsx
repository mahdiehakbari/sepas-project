'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import Link from 'next/link';
import { accordionData } from './constants';

export const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='space-y-2'>
      <h3 className='text-center text-[16px] text-black font-[700] mb-6'>
        {t('dental_plane:faq')}
      </h3>

      {accordionData.map((item, index: number) => (
        <div
          key={index}
          className='border border-border-color rounded-[8px] p-4 cursor-pointer bg-secondary'
        >
          {/* Header */}
          <div
            className='flex justify-between items-center'
            onClick={() => toggle(index)}
          >
            <h2 className='font-[500] text-[13px]'>{t(item.title)}</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>

          {/* Content */}
          <div
            className={`mt-2 overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <div className='text-second-text-color text-[13px] font-[500]'>
              {item.hasLink ? (
                <Trans
                  i18nKey={item.content}
                  components={[
                    <></>,
                    <Link
                      key='terms-link'
                      href='/services/dentalPlan'
                      className='text-primary underline font-medium'
                    />,
                  ]}
                />
              ) : (
                t(item.content)
              )}
              {item.list && (
                <ul className='mt-2 list-disc pr-5 text-[12px] space-y-1'>
                  {item.list.map((li, i) => (
                    <li key={i}>{t(li)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
