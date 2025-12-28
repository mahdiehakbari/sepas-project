'use client';
import { API_DENTIST_LIST } from '@/config/api_address.config';
import { BannerSection } from '@/features/DentistList';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paginate } from '@/sharedComponent/ui';
import { IDentist, IDentistListResponse } from './types';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ContentStateWrapper } from '@/features/layout';

const ListOfDentist = () => {
  const [dentistList, setDentistList] = useState<IDentist[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const router = useRouter();

  const fetchDentists = (pageNumber: number, search: string = '') => {
    setPageLoading(true);
    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber: pageNumber,
        pageSize: 12,
        searchTerm: search,
      })
      .then((resp) => {
        setDentistList(resp.data.items);
        setTotalPages(resp.data.totalPages);
        setPageLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    fetchDentists(page, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchDentists(1, searchTerm);
  };

  const handleRoute = (id: string) => {
    router.push(`/listOfDentists/${id}`);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('home:page_loading')}
    >
      <div className='relative'>
        <BannerSection />

        <div className='absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6'>
          <div className='max-w-3xl mx-auto flex gap-3'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={'جستجو ...'}
              className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg bg-white'
            />
            <button
              onClick={handleSearch}
              className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg'
            >
              {t('dentist_list:search') || 'جستجو'}
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-6 md:mx-auto mt-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {dentistList.map((d) => (
            <div
              key={d.id}
              className='border border-border-color p-4 rounded-md shadow-sm cursor-pointer'
              onClick={() => handleRoute(d.id)}
            >
              <div className='border-b border-border-color mb-4 pb-4'>
                <div className='w-full h-40 relative mb-3'>
                  <Image
                    src={
                      d.bannerImageFilePath == ''
                        ? '/assets/icons/images.jpg'
                        : `https://dentalitfiles.sepasholding.com/images/bannerimages/${d.bannerImageFilePath}`
                    }
                    alt='images'
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                    sizes='(max-width: 768px) 100vw, 25vw'
                  />
                </div>
                <h3 className='text-lg font-semibold mb-3'>{d.fullName}</h3>
                <p className='text-sm text-[#919191] mb-3'>{d.businessName}</p>
                <p className='text-sm text-[#919191] mb-3'>
                  {'شماره مطب'}: {d.workPlacePhoneNumber}
                </p>
                <p className='text-sm text-[#919191] '>
                  {'کد نظام پزشکی'}: {d.medicalCertificateNumber}
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Image
                  src='/assets/icons/location.svg'
                  alt='map'
                  width={16}
                  height={16}
                />
                <p className='text-sm text-[#757575] truncate w-full'>
                  {d.cityName} - {d.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Paginate
        hasPreviousPage={page > 1}
        setPage={setPage}
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={page < totalPages}
      />
    </ContentStateWrapper>
  );
};

export default ListOfDentist;
