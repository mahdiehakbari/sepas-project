import React from 'react';
import { DateInput, FormTitle, Input } from '@/sharedComponent/ui';
import { validationRules } from '../utils/validationRules';
import { IPersonalInfoSectionProps } from './types';
import { RegisterOptions, Controller } from 'react-hook-form';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
// import { BirthDate } from '@/sharedComponent/lib';

export const PersonalInfoSection: React.FC<IPersonalInfoSectionProps> = ({
  t,
  register,
  errors,
  control,
  userData,
  phoneNumber,
}) => {
  const rules = validationRules(t);

  const genderItems = [
    { id: 'Male', name: t('profile:man') },
    { id: 'Female', name: t('profile:woman') },
  ];

  const normalizedBirthDate = userData?.birthDate
    ? userData.birthDate.split('T')[0]
    : undefined;

  // Convert gender from number (0=Male, 1=Female) or string to string
  const normalizedGender =
    userData?.gender !== undefined && userData?.gender !== null
      ? userData.gender === 1 ||
        userData.gender === '1' ||
        userData.gender === 'Female'
        ? 'Female'
        : 'Male'
      : 'Male';

  console.log(
    'userData.gender:',
    userData?.gender,
    'normalizedGender:',
    normalizedGender,
  );

  return (
    <section>
      <FormTitle title={t('profile:identity_information')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-12'>
        <Input
          label={t('profile:first_name')}
          name='firstName'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          defaultValue={userData?.firstName ?? ''}
        />

        <Input
          label={t('profile:last_name')}
          name='lastName'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          defaultValue={userData?.lastName ?? ''}
        />

        <Input
          label={t('profile:phone_number')}
          name='mobile'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          // rules={
          //   !!userData?.phoneNumber || !!phoneNumber
          //     ? {}
          //     : (rules.mobile as unknown as RegisterOptions<IProfileFormValues>)
          // }
          rules={{ required: false }}
          defaultValue={userData?.phoneNumber ?? phoneNumber}
          disabled
        />

        <Input
          label={t('profile:national_id')}
          name='nationalId'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          rules={
            rules.nationalId as unknown as RegisterOptions<IProfileFormValues>
          }
          defaultValue={userData?.nationalId ?? ''}
        />

        <DateInput
          control={control}
          name='birthDate'
          label={t('profile:date_birth')}
          errors={errors}
          rules={{ required: t('profile:field_required') }}
          defaultValue={normalizedBirthDate}
        />

        <div className='flex flex-col'>
          <Controller
            name='gender'
            control={control}
            rules={{ required: t('profile:field_required') }}
            defaultValue={normalizedGender}
            render={({ field }) => (
              <select
                {...field}
                value={field.value || normalizedGender}
                onChange={(e) => field.onChange(e.target.value)}
                className={`bg-white border rounded-lg px-3 py-2 text-right placeholder-gray-400 
                  focus:outline-none focus:ring-2 ${
                    errors?.gender
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
              >
                {genderItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors?.gender?.message && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.gender.message.toString()}
            </span>
          )}
        </div>

        <Input
          label={t('profile:email')}
          name='email'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          rules={{ required: false }}
          defaultValue={userData?.email ?? ''}
        />
      </div>
    </section>
  );
};
