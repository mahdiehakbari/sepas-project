import React, { useEffect } from 'react';
import { FormTitle, Input, SelectInput } from '@/sharedComponent/ui';
import { IAddressInfoSectionProps } from './types';

export const AddressInfoSection: React.FC<IAddressInfoSectionProps> = ({
  t,
  register,
  errors,
  provinces,
  cities,
  handleProvinceChange,
  userData,
}) => {
  console.log(cities, 'fff');
  useEffect(() => {
    if (userData?.address?.provinceId) {
      handleProvinceChange(userData.address.provinceId);
    }
  }, [userData?.address?.provinceId]);
  return (
    <section>
      <FormTitle title={t('profile:address_information')} />

      <div className='grid grid-cols-2 gap-4 text-right mb-6'>
        {provinces.length > 0 && (
          <SelectInput
            label={t('profile:province')}
            name='province'
            register={register}
            options={provinces.map((p) => ({ value: p.id, label: p.name }))}
            onChange={handleProvinceChange}
            errors={errors}
            rules={{ required: t('profile:field_required') }}
            defaultValue={userData?.address?.provinceId ?? ''}
          />
        )}

        {cities.length > 0 && (
          <SelectInput
            label={t('profile:city')}
            name='cityId'
            register={register}
            options={cities.map((c) => ({ value: c.id, label: c.name }))}
            onChange={handleProvinceChange}
            errors={errors}
            rules={{ required: t('profile:field_required') }}
            defaultValue={userData?.address?.cityId ?? ''}
          />
        )}

        <Input
          label={t('profile:postal_code')}
          name='postalCode'
          register={register}
          errors={errors}
          textError={t('profile:field_required')}
          defaultValue={userData?.address?.postalCode ?? ''}
        />
      </div>

      <Input
        label={t('profile:address')}
        name='addressDetails'
        register={register}
        full
        errors={errors}
        textError={t('profile:field_required')}
        defaultValue={userData?.address?.details ?? ''}
      />
    </section>
  );
};
