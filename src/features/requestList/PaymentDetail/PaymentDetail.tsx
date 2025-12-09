'use client';
import { useTranslation } from 'react-i18next';

const PaymentDetail = () => {
  const { t } = useTranslation();
  const number = 200000;
  return (
    <div className='p-8 md:w-[600px]'>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:transaction_date')}
        </p>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:transaction_date')}
        </p>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:amount')}
        </p>
        <p className='text-black text-[16px] font-medium'>
          {number.toLocaleString('fa-IR')}ریال
        </p>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:tracking_number')}
        </p>
        <p className='text-black text-[16px] font-medium'>۲۳۴۵۴۳</p>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-black text-[16px] font-medium'>
          {t('credit:payment_method')}
        </p>
        <p className='text-black text-[16px] font-medium'>واریز به حساب</p>
      </div>
    </div>
  );
};

export default PaymentDetail;
