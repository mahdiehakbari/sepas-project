'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_CUSTOMER_CREDIT_QUERY } from '@/config/api_address.config';
import {
  RequestListTable,
  ResponsiveRequestListTable,
  useCustomerId,
} from '@/features/requestList';
import { IRequest, IRequestsData } from './types';
import { Paginate, SpinnerDiv } from '@/sharedComponent/ui';
import { Filteredtabel } from '@/features/Filteredtabel';
import DateObject from 'react-date-object';
import { filterTable } from '../utility/filterTable';
import { ContentStateWrapper } from '@/features/layout';

export default function TransactionList() {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestsData, setRequestData] = useState<IRequestsData | null>();
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [filterData, setFilterData] = useState<IRequest[] | null>(null);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const token = Cookies.get('token');

  const { customerId } = useCustomerId(() => {
    setPageLoading(false);
  });

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

  const handleFilter = () => {
    if (!requestsData) return;
    const result = filterTable({
      data: requestsData.items,
      planName,
      fromDate,
      toDate,
    });

    setFilterData(result);
  };

  const isFilterButtonDisabled = !planName && !fromDate && !toDate;

  const items = filterData ?? requestsData?.items ?? null;
  const pageSize = requestsData?.pageSize || 10;
  const totalCount = requestsData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={pageLoading && requestsData?.items.length === 0}
      loadingText={t('home:page_loading')}
      emptyText={t('home:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4'>
          {t('request_list:request_list')}
        </h1>

        <Filteredtabel
          planName={planName}
          setPlanName={setPlanName}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleFilter={handleFilter}
          isFilterButtonDisabled={isFilterButtonDisabled}
          placeholderText={t('home:search_plane')}
        />

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
    </ContentStateWrapper>
  );
}
