'use client';

import { useTranslation } from 'react-i18next';
import { IRequestItem, IRequestsData } from './types';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button, Paginate, SpinnerDiv } from '@/sharedComponent/ui';
import {
  ResponsiveTransactionListTable,
  TransactionListTable,
} from '@/features/TransactionList';
import {
  API_AUTHENTICATE_ME,
  API_PURCHASE_QUERY,
} from '@/config/api_address.config';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';

const TransactionsList = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [transactionData, setTransactionData] = useState<IRequestsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [filterData, setFilterData] = useState<IRequestItem[] | null>(null);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      setPageLoading(false);
      return;
    }

    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCustomerId(res.data.customerId))
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    if (!customerId) return;

    axios
      .get(
        `${API_PURCHASE_QUERY}/${customerId}/paged?page=${page}&pageSize=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => setTransactionData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, page]);

  const handleFilter = () => {
    if (!transactionData) return;

    const fromDateConverted = fromDate
      ? fromDate.convert(gregorian).toDate()
      : null;
    const toDateConverted = toDate ? toDate.convert(gregorian).toDate() : null;

    let fromFilter: Date;
    let toFilter: Date;
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (fromDateConverted && toDateConverted) {
      fromFilter = new Date(fromDateConverted.setHours(0, 0, 0, 0));
      toFilter = new Date(toDateConverted.setHours(23, 59, 59, 999));
    } else if (fromDateConverted && !toDateConverted) {
      fromFilter = new Date(fromDateConverted.setHours(0, 0, 0, 0));
      toFilter = today;
    } else if (!fromDateConverted && toDateConverted) {
      fromFilter = new Date('1970-01-01T00:00:00');
      toFilter = new Date(toDateConverted.setHours(23, 59, 59, 999));
    } else {
      fromFilter = new Date('1970-01-01T00:00:00');
      toFilter = today;
    }

    const filteredData = transactionData.items.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const matchesName =
        !planName || item.merchantName.includes(planName.trim());
      const matchesDate = itemDate >= fromFilter && itemDate <= toFilter;
      return matchesName && matchesDate;
    });

    setFilterData(filteredData);
  };

  const items = filterData ?? transactionData?.items ?? [];
  const pageSize = transactionData?.pageSize || 10;
  const totalCount = transactionData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const isFilterButtonDisabled = !planName && !fromDate && !toDate;

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!transactionData || transactionData.items.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('transaction_list:transaction_list')}
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='w-full'>
          <input
            type='text'
            placeholder='جستجو بر اساس نام طرح...'
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className='border border-border-color rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>

        <div className='w-full'>
          <DatePicker
            value={fromDate}
            onChange={setFromDate}
            calendar={persian}
            locale={persian_fa}
            inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
            placeholder='انتخاب تاریخ'
          />
        </div>

        <div className='w-full'>
          <DatePicker
            value={toDate}
            onChange={setToDate}
            calendar={persian}
            locale={persian_fa}
            inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
            placeholder='انتخاب تاریخ'
          />
        </div>

        <div className='w-full flex items-end'>
          <Button
            onClick={handleFilter}
            disabled={isFilterButtonDisabled}
            className={`w-full ${
              isFilterButtonDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            فیلتر
          </Button>
        </div>
      </div>

      <div className='hidden md:block'>
        <TransactionListTable
          transactions={items}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
      <div className='block md:hidden'>
        <ResponsiveTransactionListTable
          transactions={items}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>

      <Paginate
        hasPreviousPage={hasPreviousPage}
        setPage={setPage}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default TransactionsList;
