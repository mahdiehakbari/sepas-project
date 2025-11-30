'use client';

import { useTranslation } from 'react-i18next';
import {
  IAcceptorData,
  IMerchantData,
  IRequestItem,
  IRequestsData,
  ISelectOption,
} from './types';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Paginate } from '@/sharedComponent/ui';
import {
  ResponsiveTransactionListTable,
  TransactionListTable,
} from '@/features/TransactionList';

import DateObject from 'react-date-object';
import { ContentStateWrapper } from '@/features/layout';
import { PageHeader } from '@/features/PageHeader';
import { useFetchMerchant } from '@/features/hooks';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { useFilter } from '@/features/TransactionList/useFetchcustomerRequests/useFetchFilter';
import { TransactionFilter } from '@/features/TransactionList/TransactionFilter';

const TransactionsList = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);
  const [requestData, setRequestData] = useState<IRequestsData | null>(null);
  const [page, setPage] = useState(1);
  const [merchantName, setMerchantName] = useState<ISelectOption[]>([]);
  const [merchantData, setMerchantData] = useState<IMerchantData[]>([]);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const token = Cookies.get('token');
  const pageSize = 10;
  useFetchMerchant(setMerchantData);
  const { filterData } = useFilter<IRequestsData>(token, setRequestData);

  const fetchData = async (pageNumber = 1) => {
    const merchantIds = merchantName.map((c) => c.value);
    setPageLoading(true);

    await filterData(fromDate, toDate, merchantIds, pageNumber, pageSize);

    setPageLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);
  const handleFilter = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
  };

  const handleClose = () => {
    setPage(1);
    fetchData(1);
    setMerchantName([]);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
  };

  const handleRemoveFilter = () => {
    setPage(1);
    fetchData(1);
    setMerchantName([]);
    setFromDate(null);
    setToDate(null);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  console.log(requestData?.items.length, 'hiiii');

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('home:page_loading')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <PageHeader
          titleKey='transaction_list:transaction_list'
          onFilterClick={handleOpenModal}
        />
        {!pageLoading && requestData?.items.length == 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('home:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <TransactionListTable
                transactions={requestData?.items ?? []}
                currentPage={requestData?.pageNumber ?? 1}
                pageSize={requestData?.pageSize ?? pageSize}
              />
            </div>
            <div className='block md:hidden'>
              <ResponsiveTransactionListTable
                transactions={requestData?.items ?? []}
                currentPage={requestData?.pageNumber ?? 1}
                pageSize={requestData?.pageSize ?? pageSize}
              />
            </div>

            <Paginate
              hasPreviousPage={requestData?.hasPreviousPage ?? false}
              hasNextPage={requestData?.hasNextPage ?? false}
              currentPage={requestData?.pageNumber ?? 1}
              totalPages={requestData?.totalPages ?? 1}
              setPage={setPage}
            />
          </>
        )}
      </div>

      <ResponsiveModal
        title={t('home:filter')}
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <TransactionFilter
          acceptorName={merchantName}
          setAcceptorName={setMerchantName}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleFilter={handleFilter}
          placeholderText={t('panel:search_customer')}
          acceptorData={merchantData || []}
          handleRemoveFilter={handleRemoveFilter}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default TransactionsList;
