'use client';

import { useTranslation } from 'react-i18next';
import { IRequestsData } from './types';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Paginate, SpinnerDiv } from '@/sharedComponent/ui';
import {
  ResponsiveTransactionListTable,
  TransactionListTable,
} from '@/features/TransactionList';
import {
  API_AUTHENTICATE_ME,
  API_PURCHASE_QUERY,
} from '@/config/api_address.config';

const TransactionsList = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [transactionData, setTransactionData] = useState<IRequestsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
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
      .then((res) => {
        setCustomerId(res.data.customerId);
      })
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
      .then((res) => {
        setTransactionData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, page]);

  console.log('hiii', transactionData);

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

  const items = transactionData.items;
  const pageSize = transactionData.pageSize || 10;
  const totalCount = transactionData.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('transaction_list:transaction_list')}
      </h1>

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
