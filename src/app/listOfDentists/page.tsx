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
  const { t } = useTranslation();
  const router = useRouter();
  const fetchDentists = (pageNumber: number) => {
    axios
      .post<IDentistListResponse>(API_DENTIST_LIST, {
        pageNumber: pageNumber,
        pageSize: 12,
      })
      .then((resp) => {
        setDentistList(resp.data.items);
        setTotalPages(resp.data.totalPages);
        setPageLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchDentists(page);
  }, [page]);

  const handleRoute = (id: string) => {
    router.push(`/listOfDentists/${id}`);
  };

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('home:page_loading')}
    >
      <BannerSection />
      <div className='max-w-6xl mx-6 md:mx-auto mt-8'>
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
