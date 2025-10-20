'use client';
import { Button, Input, SelectInput } from '@/sharedComponent/ui';
import { useAuthStore } from '@/store/Auth/authStore';
import { useProfileStore } from '@/store/Profile/useProfileStore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormTitle } from './FormTitle';
import { IProfileFormValues } from './types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  API_CITIES_QUERY,
  API_PROVINCES_QUERY,
} from '@/config/api_address.config';

export const ProfileForm = () => {
  const { t } = useTranslation();
  const { profile, setProfile } = useProfileStore();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfileFormValues>({ defaultValues: profile });

  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();
  const onSubmit: SubmitHandler<IProfileFormValues> = (data) => {
    setProfile(data);
  };
  const savedPhone = Cookies.get('phoneNumber');
  useEffect(() => {
    if (user) {
      setPhoneNumber(user?.phoneNumber);
    } else {
      setPhoneNumber(savedPhone);
    }
  }, [savedPhone, user]);

  useEffect(() => {
    const token = Cookies.get('token');

    axios
      .get(API_PROVINCES_QUERY, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setProvinces(res.data.provinces);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

  const handleProvinceChange = (provinceId: string) => {
    setCities([]);
    setValue('city', '');
    const token = Cookies.get('token');
    axios
      .get(`${API_CITIES_QUERY}/${provinceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCities(res.data.cities))
      .catch((err) => console.error(err.response));
  };

  const handleBack = () => {
    router.push('/');
  };

  console.log(profile);

  return (
    <div className='max-w-4xl mx-auto '>
      <div className='flex items-center justify-start mb-6 gap-2'>
        <button onClick={handleBack} className='cursor-pointer'>
          <Image
            src='/assets/icons/black-back-button.svg'
            alt='close-button'
            width={24}
            height={24}
            className='cursor-pointer hover:opacity-80'
          />
        </button>

        <h2 className='text-[18px] font-[700] '>
          {t('profile:profile_setting')}
        </h2>
      </div>

      <div className='bg-[var(--block-color)] border border-border-color rounded-lg py-3 px-6 mb-6'>
        <div className='flex items-center gap-6'>
          <div className='relative'>
            <Image
              src='/assets/icons/user-profile-icon.jpg'
              alt='user-profile-icon'
              width={56}
              height={56}
              className='rounded-full'
            />
            <Image
              src='/assets/icons/profile-edit-button.svg'
              alt='profile-edit-button'
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
          <section>
            <FormTitle title={t('profile:credit_plans')} />

            <div className='grid grid-cols-2 gap-4 text-right mb-12'>
              <Input
                label={t('profile:first_name')}
                name='firstName'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
              <Input
                label={t('profile:last_name')}
                name='lastName'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
              <Input
                label={t('profile:phone_number')}
                name='mobile'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
              <Input
                label={t('profile:national_id')}
                name='nationalCode'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
              <Input
                label={t('profile:date_birth')}
                name='birthDate'
                register={register}
                type='date'
                errors={errors}
                textError={t('profile:field_required')}
              />
              <Input
                label={t('profile:gender')}
                name='gender'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
              <Input
                label={t('profile:email')}
                name='email'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
            </div>
          </section>

          <section>
            <FormTitle title={t('profile:bank_information')} />
            <div className='grid grid-cols-2 gap-4 text-right  mb-12'>
              <Input
                label={t('profile:iban')}
                name='iban'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
            </div>
          </section>

          <section>
            <FormTitle title={t('profile:address_information')} />

            <div className='grid grid-cols-2 gap-4 text-right  mb-6'>
              <SelectInput
                label={t('profile:province')}
                name='province'
                register={register}
                options={provinces.map((p) => ({ value: p.id, label: p.name }))}
                onChange={handleProvinceChange}
                errors={errors}
                rules={{ required: t('profile:field_required') }}
              />

              <SelectInput
                label={t('profile:city')}
                name='city'
                register={register}
                options={cities.map((c) => ({ value: c.id, label: c.name }))}
                errors={errors}
                rules={{ required: t('profile:field_required') }}
              />

              <Input
                label={t('profile:postal_code')}
                name='postalCode'
                register={register}
                errors={errors}
                textError={t('profile:field_required')}
              />
            </div>

            <Input
              label={t('profile:address')}
              name='address'
              register={register}
              full
              errors={errors}
              textError={t('profile:field_required')}
            />
          </section>
        </div>

        <div className='flex gap-4 mt-6'>
          <div className='w-2/3'>
            <Button type='submit' className='w-full '>
              {t('profile:profile_update')}
            </Button>
          </div>
          <div className='w-1/3'>
            <Button
              type='button'
              className='w-full bg-[var(--active-loan-text-bg)] text-black hover:bg-[var(--active-loan-text-bg)]'
            >
              {t('profile:back')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
