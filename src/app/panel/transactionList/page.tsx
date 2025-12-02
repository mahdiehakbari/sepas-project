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
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const token = Cookies.get('token');
  const pageSize = 10;
  useFetchMerchant(setMerchantData);
  const { filterData } = useFilter<IRequestsData>(token, setRequestData);

  const fetchData = async (
    pageNumber = 1,
    filterFromDate = fromDate,
    filterToDate = toDate,
    filterMerchantName = merchantName,
    filterReferenceNumber = referenceNumber,
  ) => {
    setPageLoading(true);
    const merchantIds = filterMerchantName.map((c) => c.value);

    await filterData(
      filterFromDate,
      filterToDate,
      merchantIds,
      pageNumber,
      pageSize,
      filterReferenceNumber ? Number(filterReferenceNumber) : undefined,
    );

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
    setMerchantName([]);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
    setReferenceNumber(null);
  };

  const handleRemoveFilter = () => {
    setMerchantName([]);
    setFromDate(null);
    setToDate(null);
    setReferenceNumber(null);
    setPage(1);

    fetchData(1, null, null, [], null);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('home:page_loading')}
    >
      <div className='max-w-6xl mx-auto mt-6'>
        <PageHeader
          titleKey='transaction_list:transaction_list'
          onFilterClick={handleOpenModal}
          handleRemoveFilter={handleRemoveFilter}
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
          referenceNumber={referenceNumber}
          setReferenceNumber={setReferenceNumber}
        />
      </ResponsiveModal>
    </ContentStateWrapper>
  );
};

export default TransactionsList;
