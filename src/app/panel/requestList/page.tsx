'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  API_AUTHENTICATE_ME,
  API_CUSTOMER_CREDIT_QUERY,
} from '@/config/api_address.config';
import { RequestListTable } from '@/features/requestList';
import { ResponsiveRequestListTable } from '@/features/requestList/RequestListTable/ResponsiveRequestListTable';
import { IRequestsData } from './types';
import { Paginate, SpinnerDiv } from '@/sharedComponent/ui';

export default function TransactionList() {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [requestsData, setRequestData] = useState<IRequestsData | null>(null);
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
        `${API_CUSTOMER_CREDIT_QUERY}/${customerId}?page=${page}&pageSize=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setRequestData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [customerId, page]);

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  if (!requestsData || requestsData.items.length === 0) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  const items = requestsData.items;
  const pageSize = requestsData.pageSize || 10;
  const totalCount = requestsData.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('request_list:filters')}
      </h1>

      <div className='hidden md:block'>
        <RequestListTable
          requests={items}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
      <div className='block md:hidden'>
        <ResponsiveRequestListTable
          requests={items}
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
}
