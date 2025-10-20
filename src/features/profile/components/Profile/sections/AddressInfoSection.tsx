import React from 'react';
import { Input, SelectInput } from '@/sharedComponent/ui';
import { FormTitle } from '../FormTitle';
import { IAddressInfoSectionProps } from './types';

export const AddressInfoSection: React.FC<IAddressInfoSectionProps> = ({
  t,
  register,
  errors,
  provinces,
  cities,
  handleProvinceChange,
}) => (
  <section>
    <FormTitle title={t('profile:address_information')} />

    <div className='grid grid-cols-2 gap-4 text-right mb-6'>
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
        name='cityId'
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
      name='addressDetails'
      register={register}
      full
      errors={errors}
      textError={t('profile:field_required')}
    />
  </section>
);
