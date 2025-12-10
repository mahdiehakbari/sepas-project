'use client';
import { IPaymentDetailProps } from '@/app/panel/requestList/types';
import { useTranslation } from 'react-i18next';
import { formatJalaliDateTime } from '@/sharedComponent/lib';

const PaymentDetail = ({ detailData }: IPaymentDetailProps) => {
  const { t } = useTranslation();
  return (
    <div className='p-8 md:w-[600px]'>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:transaction_date')}
        </p>
        <p className='text-black text-[16px] font-medium '>
          {formatJalaliDateTime(detailData?.createdAt)}
        </p>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:amount')}
        </p>
        <p className='text-black text-[16px] font-medium'>
          {detailData?.affectiveAmount.toLocaleString('fa-IR')}ریال
        </p>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:tracking_number')}
        </p>
        <p className='text-black text-[16px] font-medium'>{detailData?.rrn}</p>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:payment_method')}
        </p>
        <p className='text-black text-[16px] font-medium'>
          درگاه پرداخت سامان کیش
        </p>
      </div>
    </div>
  );
};

export default PaymentDetail;
