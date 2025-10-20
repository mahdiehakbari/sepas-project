'use client';
import React, { useEffect, useState } from 'react';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { useAuthStore } from '@/store/Auth/authStore';
import { useProfileStore } from '@/store/Profile/useProfileStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_UPDATE_PROFILE } from '@/config/api_address.config';
import { IProfileFormValues } from './types';
import { useLocationData } from './hooks/useLocationData';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { BankInfoSection } from './sections/BankInfoSection';
import { AddressInfoSection } from './sections/AddressInfoSection';

export const ProfileForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { profile, setProfile } = useProfileStore();
  const { user } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfileFormValues>({ defaultValues: profile });
  const { provinces, cities, handleProvinceChange } = useLocationData(setValue);

  const savedPhone = Cookies.get('phoneNumber');

  useEffect(() => {
    setPhoneNumber(user?.phoneNumber || savedPhone);
  }, [savedPhone, user]);

  const onSubmit: SubmitHandler<IProfileFormValues> = async (data) => {
    const token = Cookies.get('token');
    setIsLoading(true);
    try {
      const res = await axios.put(API_UPDATE_PROFILE, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setProfile(res.data.profile);
      setIsLoading(false);
      router.push('/');
      Cookies.set('isLoggedIn', 'true');
    } catch (err) {}
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex items-center justify-start mb-6 gap-2'>
        <button onClick={() => router.push('/')} className='cursor-pointer'>
          <Image
            src='/assets/icons/black-back-button.svg'
            alt='back'
            width={24}
            height={24}
          />
        </button>
        <h2 className='text-[18px] font-[700]'>
          {t('profile:profile_setting')}
        </h2>
      </div>

      <div className='bg-[var(--block-color)] border border-border-color rounded-lg py-3 px-6 mb-6'>
        <div className='flex items-center gap-6'>
          <div className='relative'>
            <Image
              src='/assets/icons/user-profile-icon.jpg'
              alt='user'
              width={56}
              height={56}
              className='rounded-full'
            />
            <Image
              src='/assets/icons/profile-edit-button.svg'
              alt='edit'
              width={28}
              height={28}
              className='cursor-pointer absolute top-8 left-8'
            />
          </div>
          <h2 className='font-medium text-black text-[13px]'>{phoneNumber}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-6 bg-[var(--block-color)] border border-border-color rounded-lg'>
          <PersonalInfoSection t={t} register={register} errors={errors} />
          <BankInfoSection t={t} register={register} errors={errors} />
          <AddressInfoSection
            t={t}
            register={register}
            errors={errors}
            provinces={provinces}
            cities={cities}
            handleProvinceChange={handleProvinceChange}
          />
        </div>

        <div className='flex gap-4 mt-6'>
          <div className='w-2/3'>
            <Button disabled={isLoading} type='submit' className='w-full'>
              {isLoading ? (
                <SpinnerDiv size='sm' className='text-white' />
              ) : (
                t('profile:profile_update')
              )}
            </Button>
          </div>
          <div className='w-1/3'>
            <Button
              disabled={isLoading}
              type='button'
              className='w-full bg-[var(--active-loan-text-bg)] text-black hover:bg-[var(--active-loan-text-bg)]'
              onClick={() => router.push('/')}
            >
              {t('profile:back')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
