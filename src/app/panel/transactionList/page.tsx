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
  useCustomerId,
} from '@/features/TransactionList';
import { API_PURCHASE_QUERY } from '@/config/api_address.config';
import DateObject from 'react-date-object';
import { filterTable } from '../utility/filterTable';
import { Filteredtabel } from '@/features/Filteredtabel';
import { ContentStateWrapper } from '@/features/layout';

const TransactionsList = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<IRequestsData | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [planName, setPlanName] = useState('');
  const [filterData, setFilterData] = useState<IRequestItem[] | null>(null);
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
    const result = filterTable({
      data: transactionData.items,
      planName,
      fromDate,
      toDate,
    });
    setFilterData(result);
  };

  const items = filterData ?? transactionData?.items ?? [];
  const pageSize = transactionData?.pageSize || 10;
  const totalCount = transactionData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentPage = page;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const isFilterButtonDisabled = !planName && !fromDate && !toDate;

  return (
    <ContentStateWrapper
      loading={pageLoading}
      isEmpty={pageLoading && transactionData?.items.length === 0}
      loadingText={t('panel:page_loading')}
      emptyText={t('panel:empty')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <h1 className='text-black font-bold text-lg mb-4'>
          {t('transaction_list:transaction_list')}
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
    </ContentStateWrapper>
  );
};

export default TransactionsList;
