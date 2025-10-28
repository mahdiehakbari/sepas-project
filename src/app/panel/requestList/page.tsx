'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { RequestListTable } from '@/features/requestList';
import { ResponsiveRequestListTable } from '@/features/requestList/RequestListTable/ResponsiveRequestListTable';
import {
  API_AUTHENTICATE_ME,
  API_CUSTOMER_CREDIT_QUERY,
} from '@/config/api_address.config';

export default function TransactionList() {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');
  const [requestsData, setRequestData] = useState(null);
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
      .catch(() => setPageLoading(false));
  }, [token]);

  useEffect(() => {
    if (!customerId) return;

    setPageLoading(true);
    axios
      .get(
        `${API_CUSTOMER_CREDIT_QUERY}/${customerId}?pageNumber=${page}&pageSize=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => setRequestData(res.data))
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

  if (!requestsData) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        هیچ داده‌ای یافت نشد.
      </div>
    );
  }

  const { items, totalPages, hasNextPage, hasPreviousPage, pageNumber } =
    requestsData;

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-black font-bold text-lg mb-4'>
        {t('request_list:list_title') || 'لیست درخواست‌ها'}
      </h1>

      {/* Desktop Table */}
      <div className='hidden md:block'>
        <RequestListTable requests={items} />
      </div>

      {/* Mobile Table */}
      <div className='block md:hidden'>
        <ResponsiveRequestListTable requests={items} />
      </div>

      <div className='flex justify-center items-center gap-2 mt-6'>
        <Button
          disabled={!hasPreviousPage}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={`px-3 py-2 text-sm rounded-md ${
            !hasPreviousPage
              ? 'opacity-50 cursor-not-allowed bg-gray-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          قبلی
        </Button>

        <div className='flex gap-1'>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                pageNumber === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <Button
          disabled={!hasNextPage}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className={`px-3 py-2 text-sm rounded-md ${
            !hasNextPage
              ? 'opacity-50 cursor-not-allowed bg-gray-200'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
