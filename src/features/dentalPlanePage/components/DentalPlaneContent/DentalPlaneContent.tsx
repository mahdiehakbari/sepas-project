'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export const DentalPlaneContent = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };


  return (
    <div className='mb-12'>
      <h2 className='font[700] text-[24px] mb-4'>
        {t('dental_plane:introducing_plan')}
      </h2>

      <p className='font-[400] text-[14px] mb-6'>
        {t('dental_plane:dental_plane_desc')}
      </p>
      <p className='font-[400] text-[14px] mb-12'>
        {t('dental_plane:dental_plane_desc2')}
      </p>

      <div className='py-2 px-10 bg-secondary rounded-2xl mb-12'>
        <h3 className='font-[700] text-[14px] mb-2 text-[var(--second-primary)]'>
          {t('dental_plane:conditions_requesting')}
        </h3>
        <ul className='list-disc px-7 font-[400] text-[14px]'>
          <li className='mb-2'>{t('dental_plane:conditions_requesting_desc1')}</li>
          <li className='mb-2'>{t('dental_plane:conditions_requesting_desc2')}</li>
          <li>{t('dental_plane:conditions_requesting_desc3')}</li>
        </ul>
      </div>

      <div className='py-2 px-10 bg-secondary rounded-2xl mb-12'>
        <h3 className='font-[700] text-[14px] mb-2 text-[var(--second-primary)]'>
          {t('dental_plane:why_installments')}
        </h3>
        <ul className='list-disc px-7 font-[400] text-[14px]'>
          <li className='mb-2'>{t('dental_plane:why_installments_desc1')}</li>
          <li className='mb-2'>{t('dental_plane:why_installments_desc2')}</li>
          <li className='mb-2'>{t('dental_plane:why_installments_desc3')}</li>
          <li>{t('dental_plane:why_installments_desc4')}</li>
        </ul>
      </div>

      <div className='py-2 px-10 bg-secondary rounded-2xl mb-12' id="process_receiving">
        <h3 className='font-[700] text-[14px] mb-2 text-[var(--second-primary)]'>
          {t('dental_plane:who_can_purchase')}
        </h3>
        <ul className='list-disc px-7 font-[400] text-[14px]'>
          <li className='mb-2'>{t('dental_plane:who_can_purchase_desc1')}</li>
          <li className='mb-2'>{t('dental_plane:who_can_purchase_desc2')}</li>
        </ul>
      </div>

      <div className='mb-4'>
        <h3 className='font-[700] text-[14px] mb-6'>
          {t('dental_plane:conditions_receiving')}
        </h3>

        <div className='md:flex items-center gap-1 mb-2'>
          <span className='font-[500] text-[14px]'>
            {t('dental_plane:install_budget_app')}
          </span>
        </div>
        <p className='font-[400] text-[14px] mb-6'>
          {t('dental_plane:install_budget_app_desc')}
          <Link href='https://mybajet.ir/#download-target' className='text-primary cursor-pointer'>
            {t('dental_plane:click_here')}
          </Link>
        </p>

        <div className='md:flex items-center gap-1 mb-2'>
          <span className='font-[500] text-[14px]'>
            {t('dental_plane:after_receiving_credit')}
          </span>
        </div>
        <p className='font-[400] text-[14px] mb-6'>
          {t('dental_plane:after_receiving_credit_desc')}
          <Link href='#bajet_video' className='text-primary cursor-pointer'>
            {t('dental_plane:bajet_video_link')}
          </Link>
        </p>

        <div className='md:flex items-center gap-1 mb-2'>
          <span className='font-[500] text-[14px]'>
            {t('dental_plane:activate_in_dentalit')}
          </span>
        </div>
        <p className='font-[400] text-[14px] mb-6'>
          {t('dental_plane:activate_in_dentalit_desc')}
        </p>

        <div className='md:flex items-center gap-1 mb-2'>
          <span className='font-[500] text-[14px]'>
            {t('dental_plane:referral_to_doctors')}
          </span>
        </div>
        <p className='font-[400] text-[14px] mb-6'>
          {t('dental_plane:referral_to_doctors_desc')}
          <Link href='/listOfDoctors' className='text-primary cursor-pointer'>
            {t('dental_plane:doctors_page_link')}
          </Link>
        </p>
      </div>

      <div className='py-2 px-4 bg-[var(--light-primary)] rounded-2xl mb-4 flex items-center gap-4 border border-[var(--primary-border)]'>
        <Image
          src='/assets/icons/notice-icon.svg'
          alt='logo'
          width={20}
          height={20}
        />
        <p className='font-[400] text-[14px] text-[var(--second-primary)]'>
          {t('dental_plane:constitutes_receiving_credit')}
        </p>
      </div>

      <h2 className='font[700] text-[24px] mb-4' id="bajet_video">
        {t('dental_plane:kalanow_credit')}
      </h2>

      <div className='flex justify-center mb-6'>
        <div className='relative w-[300px] md:w-[250px] pb-[56.20%]'>
          <video
            ref={videoRef}
            className='absolute top-0 left-0 w-full h-full rounded-lg shadow-lg object-cover'
            src='/assets/video/kalano.mp4'
            playsInline
            preload='metadata'
          />

          <button
            onClick={togglePlay}
            className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-1 rounded-lg shadow font-semibold cursor-pointer'
          >
            {isPlaying ? '⏸ توقف' : '▶ پخش'}
          </button>
        </div>
      </div>
    </div>
  );
};
