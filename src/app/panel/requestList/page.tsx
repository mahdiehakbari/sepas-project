'use client';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { Button, Input } from '@/sharedComponent/ui';
import { getThItems } from '@/features/requestList/RequestListTable/constants';
import { RequestListTable } from '@/features/requestList';
import { ResponsiveRequestListTable } from '@/features/requestList/RequestListTable/ResponsiveRequestListTable';

export default function TransactionList() {
  const { t } = useTranslation();
  const [requests] = useState([
    {
      id: 1,
      plan: 'دندان پزشکی',
      date: '1400/12/20',
      status: 'تایید شده',
      action: 'پرداخت تومان',
    },
    {
      id: 2,
      plan: 'بیمه',
      date: '1400/12/20',
      status: 'در حال بررسی',
      action: '',
    },
    {
      id: 3,
      plan: 'گردشگری',
      date: '1400/12/20',
      status: 'در حال بررسی',
      action: '',
    },
    { id: 4, plan: 'پیک', date: '1400/12/20', status: 'رد شده', action: '' },
    {
      id: 5,
      plan: 'دندان پزشکی',
      date: '1400/12/20',
      status: 'پرداخت شده',
      action: 'درخواست اعتبار',
    },
    {
      id: 6,
      plan: 'بیمه',
      date: '1400/12/20',
      status: 'در حال بررسی',
      action: '',
    },
    {
      id: 7,
      plan: 'گردشگری',
      date: '1400/12/20',
      status: 'در حال بررسی',
      action: '',
    },
    {
      id: 8,
      plan: 'پیک',
      date: '1400/12/20',
      status: 'در حال بررسی',
      action: '',
    },
    {
      id: 9,
      plan: 'دندان پزشکی',
      date: '1400/12/20',
      status: 'در حال بررسی',
      action: '',
    },
  ]);

  return (
    <div>
      <h1 className='text-black font[700] text-[14px] mb-2'>
        {t('request_list:filters')}
      </h1>

      <div className='w-full'>
        {/* <div className='flex flex-wrap justify-between items-center gap-4 mb-4'>
          <div className='flex gap-2'>
            <input type='text' className='text-right' />
            <input
              placeholder='تا تاریخ درخواست'
              type='text'
              className='text-right'
            />
          </div>
          <input
            placeholder='نام طرح'
            type='text'
            className='w-40 text-right'
          />
          <Button>{t('request_list:receive_report')}</Button>
        </div> */}

        <div>
          <div className='hidden md:block'>
            <RequestListTable requests={requests} />
          </div>

          <div className='block md:hidden'>
            <ResponsiveRequestListTable />
          </div>
        </div>
      </div>
    </div>
  );
}
