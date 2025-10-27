'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { useAuthStore } from '@/store/Auth/authStore';
import { useProfileStore } from '@/store/Profile/useProfileStore';
import { IProfileFormProps, IProfileFormValues } from './types';
import { useLocationData } from './hooks/useLocationData';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { BankInfoSection } from './sections/BankInfoSection';
import { AddressInfoSection } from './sections/AddressInfoSection';
import { formatBirthDate } from './utils/formatBirthDate';
import { updateProfile } from './api/profile.api';
import axios from 'axios';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';

export const ProfileForm: React.FC<IProfileFormProps> = ({
  name,
  handleBack,
  onSuccess,
  setIsEditing,
  setShowProfileModal,
  setShowCreditNoteModal,
  setUser,
}) => {
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
    control,

    formState: { errors },
  } = useForm<IProfileFormValues>({ defaultValues: profile });

  const { provinces, cities, handleProvinceChange } = useLocationData(setValue);
  const savedPhone = Cookies.get('phoneNumber');

  useEffect(() => {
    setPhoneNumber(user?.phoneNumber || savedPhone);
  }, [savedPhone, user]);

  const onSubmit: SubmitHandler<IProfileFormValues> = async (data) => {
    const token = Cookies.get('token');
    if (!token) return toast.error(t('profile:token_missing'));

    setIsLoading(true);

    const formattedData: Partial<IProfileFormValues> = {
      ...data,
      birthDate: formatBirthDate(data.birthDate),
      email: data.email || undefined,
      iban: data.iban || undefined,
      FullName: `${data.firstName} ${data.lastName}`,
    };

    try {
      const res = await updateProfile(token, formattedData);
      setProfile(res.data.profile);
      Cookies.set('userProfile', JSON.stringify(data));
      if (name === 'userAccount') {
        axios
          .get(API_AUTHENTICATE_ME, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const userData =
              typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (setIsEditing && setUser) {
              setUser(userData);
              setIsEditing(false);
            }
            Cookies.set('userProfile', JSON.stringify(data));
            toast.success(t('profile:success_toast'));
          })
          .catch(() => {});
      }
      // onSuccess?.(data);
      setShowProfileModal?.(false);
      setShowCreditNoteModal?.(true);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || t('profile:update_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${name == 'credit' ? 'md:w-[800px]' : 'max-w-4xl mx-auto'}`}
    >
      {name !== 'userAccount' && name !== 'credit' && (
        <>
          <div className='flex items-center gap-2 mb-6'>
            <button onClick={() => router.push('/')} className='cursor-pointer'>
              <Image
                src='/assets/icons/black-back-button.svg'
                alt='back'
                width={24}
                height={24}
              />
            </button>
            <h2 className='text-[18px] font-bold'>
              {t('profile:complete_profile')}
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
              <h2 className='font-medium text-black text-[13px]'>
                {phoneNumber}
              </h2>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-6 bg-[var(--block-color)] border border-border-color rounded-lg space-y-6'>
          <PersonalInfoSection
            t={t}
            register={register}
            errors={errors}
            control={control}
          />
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

        <div className='flex justify-end gap-4 my-6'>
          <Button
            variant='outline'
            disabled={isLoading}
            type='button'
            onClick={handleBack}
          >
            {t('profile:back')}
          </Button>
          <Button disabled={isLoading} type='submit'>
            {isLoading ? (
              <SpinnerDiv size='sm' className='text-white' />
            ) : (
              t('profile:record_information')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
