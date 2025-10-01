'use client';
import { useTranslation } from 'react-i18next';

export const FirstTab = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-wrap -mx-4 '>
      <div className='w-full md:w-6/12 px-4 mb-4 md:mb-0'>
        <div className=' p-6 rounded-lg  border-2  border-border-color bg-white'>
          ستون اول
        </div>
      </div>

      <div className='w-full md:w-6/12 px-4'>
        <div className='p-6 rounded-lg  border-2  border-border-color bg-white'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-black text-[14px] font-[500]'>
              {t('dental_plane:calculation_results')}
            </h3>
            <p className='text-primary text-[14px] font-[700] bg-active-tab-color px-4 py-1 rounded-[16px]'>
              {t('dental_plane:interest_rate')}
            </p>
          </div>
          <div className='w-full md:w-6/12 px-4'>
            <div className='p-6 rounded-lg  border-1  border-border-color bg-col-bg'></div>
          </div>
          <div className='w-full md:w-6/12 px-4'>
            <div className='p-6 rounded-lg  border-1  border-border-color bg-col-bg'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
