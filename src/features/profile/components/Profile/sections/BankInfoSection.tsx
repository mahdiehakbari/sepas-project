import React from 'react';
import { FormTitle, Input } from '@/sharedComponent/ui';
import { IBankInfoSectionProps } from './types';

export const BankInfoSection: React.FC<IBankInfoSectionProps> = ({
  t,
  register,
  errors,
  userData,
}) => (
  <section>
    <FormTitle title={t('profile:bank_information')} />
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right mb-12'>
      <Input
        label={t('profile:iban')}
        name='iban'
        register={register}
        errors={errors}
        textError={t('profile:field_required')}
        rules={{ required: false }}
        defaultValue={userData?.iban ?? ''}
      />
    </div>
  </section>
);
