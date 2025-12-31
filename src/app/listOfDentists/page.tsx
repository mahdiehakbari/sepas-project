'use client';

import {
  API_CITIES_QUERY_ALL,
  API_DENTIST_LIST,
} from '@/config/api_address.config';
import { BannerSection } from '@/features/DentistList';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Paginate } from '@/sharedComponent/ui';
import { ICity, IDentist, IDentistListResponse } from './types';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ContentStateWrapper } from '@/features/layout';
import Cookies from 'js-cookie';

const ListOfDentist = () => {
  const [dentistList, setDentistList] = useState<IDentist[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [hasSearch, setHasSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<ICity[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const router = useRouter();
  const token = Cookies.get('token');

  const fetchDentists = (
    pageNumber: number,
    search: string = '',
    cityIds: string[] = [],
  ) => {
    setPageLoading(true);
    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber,
        pageSize: 12,
        searchTerm: search,
        cityIds,
      })
      .then((resp) => {
        setDentistList(resp.data.items);
        setTotalPages(resp.data.totalPages);
      })
      .finally(() => setPageLoading(false));
  };

  useEffect(() => {
    fetchDentists(page, searchTerm, selectedCityIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchDentists(1, searchTerm, selectedCityIds);
    setHasSearch(true);
  };

  const handleRoute = (id: string) => {
    router.push(`/listOfDentists/${id}`);
  };

  useEffect(() => {
    axios
      .get<{ cities: ICity[] }>(API_CITIES_QUERY_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCities(res.data.cities);
      });
  }, [token]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCityIds([]);
    setCitySearch('');
    setPage(1);
    setHasSearch(false);
    fetchDentists(1);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('home:page_loading')}
    >
      <div className='relative'>
        <BannerSection />

        <div className='flex max-w-3xl mx-auto -mt-5'>
          <div className='relative flex-1 flex items-center border py-1 border-gray-300 rounded-lg bg-white shadow-lg'>
            <button
              type='button'
              className='flex items-center gap-1 px-3 py-2 border rounded-2xl border-primary text-sm text-primary mr-2 hover:bg-gray-100'
              onClick={() => setShowCityDropdown((p) => !p)}
            >
              {selectedCityIds.length > 0
                ? cities.find((c) => c.id === selectedCityIds[0])?.name
                : 'انتخاب شهر'}
              <Image
                src='/assets/icons/arrow.svg'
                alt='arrow'
                width={10}
                height={10}
                className='rotate-270'
              />
            </button>

            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='جستجو پزشک'
              className='flex-1 px-4 py-2 outline-none text-sm'
            />

            {hasSearch && (
              <button
                onClick={clearFilters}
                className='ml-2 text-xs text-red-500 px-2 py-1 border border-red-300 rounded-full hover:bg-red-50'
              >
                حذف
              </button>
            )}
            {showCityDropdown && (
              <div className='absolute !w-40 top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto'>
                <input
                  type='text'
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder='جستجو شهر...'
                  className='w-full px-3 py-2 border-b border-gray-200 outline-none text-sm'
                />
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <div
                      key={city.id}
                      onClick={() => {
                        setSelectedCityIds([city.id]);
                        setShowCityDropdown(false);
                        setCitySearch('');
                      }}
                      className='px-4 py-2 cursor-pointer text-sm hover:bg-gray-100'
                    >
                      {city.name}
                    </div>
                  ))
                ) : (
                  <div className='px-4 py-2 text-sm text-gray-500'>
                    شهری یافت نشد
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            onClick={handleSearch}
            className='mr-4 z-999 px-6 py-2  text-white rounded-lg  transition-colors shadow-lg'
          >
            {t('dentist_list:search') || 'جستجو'}
          </Button>
        </div>
      </div>

      <div className='max-w-6xl mx-6 md:mx-auto mt-24 relative z-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {dentistList.map(
            (d) =>
              d.isVerified && (
                <div
                  key={d.id}
                  className='border border-border-color p-4 rounded-md shadow-sm cursor-pointer bg-white'
                  onClick={() => handleRoute(d.id)}
                >
                  <div className='border-b border-border-color mb-4 pb-4'>
                    <div className='w-full h-40 relative mb-3'>
                      <img
                        src={
                          d.bannerImageFilePath
                            ? `https://dentalitfiles.sepasholding.com/images/bannerimages/${d.bannerImageFilePath}`
                            : '/assets/icons/images.jpg'
                        }
                        alt='images'
                        className='w-full h-full object-cover rounded-md'
                      />
                    </div>
                    <h3 className='text-lg font-semibold mb-3'>{d.fullName}</h3>
                    <p className='text-sm text-[#919191] mb-3'>
                      {d.businessName}
                    </p>
                    <p className='text-sm text-[#919191] mb-3'>
                      شماره مطب: {d.workPlacePhoneNumber}
                    </p>
                    <p className='text-sm text-[#919191]'>
                      کد نظام پزشکی: {d.medicalCertificateNumber}
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Image
                      src='/assets/icons/location.svg'
                      alt='map'
                      width={16}
                      height={16}
                    />
                    <p className='text-sm text-[#757575] truncate'>
                      {d.cityName} - {d.address}
                    </p>
                  </div>
                </div>
              ),
          )}
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
