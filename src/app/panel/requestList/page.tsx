'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  RequestListTable,
  ResponsiveRequestListTable,
} from '@/features/requestList';
import { IRequestsData } from './types';
import { Paginate } from '@/sharedComponent/ui';
import DateObject from 'react-date-object';
import { ContentStateWrapper } from '@/features/layout';
import { useFilter } from '@/features/requestList/hooks/FetchRequestData';
import { PageHeader } from '@/features/PageHeader';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { FilterRequest } from '@/features/requestList/FilterRequest';

export default function TransactionList() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [requestsData, setRequestData] = useState<IRequestsData | null>(null);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState<DateObject | null>(null);
  const [toDate, setToDate] = useState<DateObject | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const token = Cookies.get('token');
  const pageSize = 10;
  const { filterData } = useFilter<IRequestsData>(token, setRequestData);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);

    await filterData(fromDate, toDate, pageNumber, pageSize);

    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setPage(1);
    fetchData(1);
    setIsOpenModal(false);
    setFromDate(null);
    setToDate(null);
  };

  const handleRemoveFilter = () => {
    setPage(1);
    setFromDate(null);
    setToDate(null);
  };

  const items = requestsData?.items ?? [];
  const totalPages = requestsData?.totalPages ?? 1;

  return (
    <ContentStateWrapper loading={loading} loadingText={t('home:page_loading')}>
      <div className='max-w-6xl mx-auto mt-6'>
        <PageHeader
          titleKey='request_list:request_list'
          onFilterClick={handleOpenModal}
        />
        <ResponsiveModal
          isOpen={isOpenModal}
          title={t('panel:filter')}
          onClose={handleClose}
        >
          <FilterRequest
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            handleFilter={handleFilter}
            handleRemoveFilter={handleRemoveFilter}
          />
        </ResponsiveModal>
        {!loading && items.length === 0 ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('home:empty')}
          </div>
        ) : (
          <>
            <div className='hidden md:block'>
              <RequestListTable
                requests={items}
                currentPage={page}
                pageSize={10}
              />
            </div>

            <div className='block md:hidden'>
              <ResponsiveRequestListTable
                requests={items}
                currentPage={page}
                pageSize={10}
              />
            </div>

            <Paginate
              hasPreviousPage={page > 1}
              setPage={setPage}
              currentPage={page}
              totalPages={totalPages}
              hasNextPage={page < totalPages}
            />
          </>
        )}
      </div>
    </ContentStateWrapper>
  );
}
