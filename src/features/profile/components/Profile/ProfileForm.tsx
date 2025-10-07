'use client';
import { Input } from '@/sharedComponent/ui';
import { useProfileStore } from '@/store/Profile/useProfileStore';
import Image from 'next/image';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  birthDate: string;
  gender: string;
  email: string;
  iban: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

export const ProfileForm = () => {
  const { t } = useTranslation();
  const { profile, setProfile } = useProfileStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({ defaultValues: profile });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    setProfile(data);
    alert('پروفایل با موفقیت به‌روزرسانی شد ✅');
  };

  const handleBack = () => {};

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

      <div className='bg-[var(--block-color)] border border-border-color rounded-lg py-3 px-6'>
        ssss
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <section>
          <div className='flex items-center gap-6'>
            <h2 className='text-lg font-semibold text-gray-800'>
              طرح‌های اعتباری
            </h2>
            <div className='flex-grow border-t border-gray-300 '></div>
          </div>

          <div className='grid grid-cols-2 gap-4 text-right'>
            <Input label='نام' name='firstName' register={register} required />
            <Input
              label='نام خانوادگی'
              name='lastName'
              register={register}
              required
            />
            <Input
              label='شماره موبایل'
              name='mobile'
              register={register}
              required
            />
            <Input
              label='کد ملی'
              name='nationalCode'
              register={register}
              required
            />
            <Input
              label='تاریخ تولد'
              name='birthDate'
              register={register}
              required
              type='date'
            />
            <Input label='جنسیت' name='gender' register={register} required />
            <Input label='ایمیل' name='email' register={register} />
          </div>
        </section>

        {/* اطلاعات بانکی */}
        <section>
          <h3 className='font-semibold text-gray-700 mb-4 text-right border-b pb-2'>
            اطلاعات بانکی
          </h3>
          <div className='grid grid-cols-2 gap-4 text-right'>
            <Input label='شماره شبا' name='iban' register={register} />
          </div>
        </section>

        {/* اطلاعات آدرس */}
        <section>
          <h3 className='font-semibold text-gray-700 mb-4 text-right border-b pb-2'>
            اطلاعات آدرس
          </h3>

          <div className='grid grid-cols-2 gap-4 text-right'>
            <Input label='کشور' name='country' register={register} />
            <Input label='استان' name='province' register={register} required />
            <Input label='شهرستان' name='city' register={register} />
            <Input
              label='کد پستی'
              name='postalCode'
              register={register}
              required
            />
          </div>
          <Input label='آدرس' name='address' register={register} full />
        </section>

        {/* دکمه‌ها */}
        <div className='flex justify-between pt-6 border-t'>
          <button
            type='button'
            className='px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition'
          >
            بازگشت
          </button>
          <button
            type='submit'
            className='px-8 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
          >
            به‌روزرسانی پروفایل
          </button>
        </div>
      </form>
    </div>
  );
};
