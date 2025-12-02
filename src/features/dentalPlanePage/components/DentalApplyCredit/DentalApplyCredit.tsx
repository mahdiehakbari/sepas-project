'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getTabsItem } from './constants';
import { useTranslation } from 'react-i18next';
import { ICreditProps } from './types';

export const DentalApplyCredit = ({
  setIsOpenModal,
  isOpenModal,
  budgetData,
  setBudgetData,
  showBill,
  setShowBill,
  paymentReceiptStep,
  setPaymentReceiptStep,
  creditRequestId,
  setCreditRequestId,
  showCreditNoteModal,
  setShowCreditNoteModal,
  feePercentage,
  setFeePercentage,
  modalLoading,
  setModalLoading,
}: ICreditProps) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tabsItem = getTabsItem(
    isOpenModal,
    setIsOpenModal,
    setBudgetData,
    budgetData,
    showBill,
    setShowBill,
    paymentReceiptStep,
    setPaymentReceiptStep,
    creditRequestId,
    setCreditRequestId,
    showCreditNoteModal,
    setShowCreditNoteModal,
    feePercentage,
    setFeePercentage,
    modalLoading,
    setModalLoading,
  );

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className='mb-12'>
      <h2 className='font[700] text-[24px] mb-4'>
        {t('dental_plane:kalanow_credit')}
      </h2>

      <div className='flex justify-center mb-6'>
        <div className='relative w-[300px] md:w-[250px] pb-[56.20%]'>
          <video
            ref={videoRef}
            className='absolute top-0 left-0 w-full h-full rounded-lg shadow-lg'
            src='/assets/video/kalano.mp4'
            playsInline
            muted
            preload='none'
          />
        </div>
      </div>

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
