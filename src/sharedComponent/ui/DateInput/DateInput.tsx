'use client';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IDateInputProps } from './types';

export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
  rules,
  textError,
}: IDateInputProps<T>) => {
  const hasError = !!errors[name];

  return (
    <div className='flex flex-col'>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={(date) => {
              if (date instanceof DateObject) {
                field.onChange(date.format('YYYY/MM/DD'));
              } else {
                field.onChange('');
              }
            }}
            calendar={persian}
            locale={persian_fa}
            inputClass={`w-full bg-white border rounded-lg px-3 py-2 text-right placeholder-gray-400 
                        focus:outline-none focus:ring-2 ${
                          hasError
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
            placeholder={`${label} *`}
            calendarPosition='bottom-right'
          />
        )}
      />

      {hasError && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[name]?.message?.toString() || textError}
        </span>
      )}
    </div>
  );
};
