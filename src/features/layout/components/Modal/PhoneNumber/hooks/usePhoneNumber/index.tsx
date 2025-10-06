'use client';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export const usePhoneNumber = (
  setValue: UseFormSetValue<{ phoneNumber: string }>,
) => {
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
    setValue('phoneNumber', value);
    setIsValid(value.length === 11);
  };

  return { handleChange, isValid };
};
