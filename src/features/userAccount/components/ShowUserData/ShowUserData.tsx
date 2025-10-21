'use client';

import { FormTitle } from '@/sharedComponent/ui';
import { useTranslation } from 'react-i18next';
import { IShowUserDataProps } from './types';
import { useEffect, useState } from 'react';

export const ShowUserData: React.FC<IShowUserDataProps> = ({ user }) => {
  const { t } = useTranslation();
  const [provinceName, setProvinceName] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    const storedProvinces = localStorage.getItem('provinces');
    if (storedProvinces) {
      try {
        const provinces = JSON.parse(storedProvinces) as {
          id: string;
          name: string;
        }[];
        const matchedProvince = provinces.find((p) => p.id === user.province);
        setProvinceName(matchedProvince ? matchedProvince.name : '');
      } catch (error) {
        console.error('خطا در خواندن provinces از localStorage:', error);
      }
    }

    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      try {
        const cities = JSON.parse(storedCities) as {
          id: string;
          name: string;
        }[];
        const matchedCity = cities.find((c) => c.id === user.cityId);
        setCityName(matchedCity ? matchedCity.name : '');
      } catch (error) {
        console.error('خطا در خواندن cities از localStorage:', error);
      }
    }
  }, [user.province, user.cityId]);

  return (
    <div className='bg-[var(--block-color)] rounded-2xl p-6 '>
      <FormTitle title={t('profile:identity_information')} />
      <div className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:first_name')}
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.firstName}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:last_name')}
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.lastName}
            </p>
          </div>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:phone_number')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.mobile}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:national_id')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.nationalId}
            </p>
          </div>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:date_birth')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.birthDate}
            </p>
          </div>
          <div className='flex justify-between items-center pl-6  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:gender')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.gender == '2' ? 'زن' : 'مرد'}
            </p>
          </div>
          <div className='flex justify-between items-center border-l-2 border-[#C2C2C2] pl-6 mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:email')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.email || '-'}
            </p>
          </div>
        </div>

        <FormTitle title={t('profile:bank_information')} />
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex justify-between items-center  mb-6 pl-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:iban')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.iban || '-'}
            </p>
          </div>
        </div>
        <FormTitle title={t('profile:address_information')} />
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>استان:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {provinceName}
            </p>
          </div>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>شهر:</p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>{cityName}</p>
          </div>
          <div className='flex justify-between items-center  mb-6'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:postal_code')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.postalCode}
            </p>
          </div>
          <div className='col-span-2 flex items-center gap-3'>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {t('profile:address')}:
            </p>
            <p className='text-[#3B3B3B] text-[14px] font-[500]'>
              {user.addressDetails}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
