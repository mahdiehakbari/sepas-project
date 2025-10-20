import React from 'react';
import { Input } from '@/sharedComponent/ui';
import { FormTitle } from '../FormTitle';
import { validationRules } from '../utils/validationRules';
import { IPersonalInfoSectionProps } from './types';

export const PersonalInfoSection: React.FC<IPersonalInfoSectionProps> = ({
  t,
  register,
  errors,
}) => {
  const rules = validationRules(t);

  return (
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
          rules={rules.mobile}
        />

        <Input
          label={t('profile:national_id')}
          name='nationalId'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          rules={rules.nationalCode}
        />

        <Input
          label={t('profile:date_birth')}
          name='birthDate'
          type='date'
          register={register}
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
  );
};
