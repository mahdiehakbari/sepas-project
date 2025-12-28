import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IDateInputProps } from './types';
import { CalendarIcon } from 'lucide-react';

type DateInputProps<T extends FieldValues> = IDateInputProps<T> & {
  defaultValue?: string;
};

const normalizeDateOnly = (value?: string) => {
  if (!value) return undefined;
  return value.includes('T') ? value.split('T')[0] : value;
};

export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
  rules,
  textError,
  defaultValue,
}: DateInputProps<T>) => {
  const hasError = !!errors[name];

  const [pickerValue, setPickerValue] = useState<DateObject | undefined>();
  useEffect(() => {
    const normalized = normalizeDateOnly(defaultValue);

    if (!normalized) {
      setPickerValue(undefined);
      return;
    }

    const persianDate = new DateObject({
      date: normalized,
      format: 'YYYY-MM-DD',
      calendar: gregorian,
    }).convert(persian);

    setPickerValue(persianDate);
  }, [defaultValue]);

  return (
    <div className='flex flex-col'>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={normalizeDateOnly(defaultValue) as never}
        render={({ field }) => (
          <DatePicker
            value={pickerValue}
            calendar={persian}
            locale={persian_fa}
            format='YYYY/MM/DD'
            calendarPosition='bottom-right'
            onChange={(date) => {
              if (!(date instanceof DateObject)) {
                setPickerValue(undefined);
                field.onChange(undefined);
                return;
              }
              setPickerValue(date);
              const gregorianDate = date
                .convert(gregorian)
                .format('YYYY-MM-DD');
              const isoDate = `${gregorianDate}T00:00:00.000Z`;
              field.onChange(isoDate as PathValue<T, Path<T>>);
            }}
            render={(value, openCalendar) => (
              <div className='relative'>
                <input
                  value={value}
                  readOnly
                  onClick={openCalendar}
                  placeholder={`${label} *`}
                  className={`w-full bg-white border rounded-lg px-3 py-2 pr-4 text-right placeholder-gray-400 
          focus:outline-none focus:ring-2 ${
            hasError
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
                />

                <button
                  type='button'
                  onClick={openCalendar}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                >
                  <CalendarIcon color='#757575' size={15} />
                </button>
              </div>
            )}
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
