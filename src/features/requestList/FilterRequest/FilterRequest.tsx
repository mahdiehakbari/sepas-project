import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IFilterProps } from './types';
import { Button } from '@/sharedComponent/ui';
import { englishToPersian, persianToEnglish } from '@/features/hooks';

const FilterRequest = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleRemoveFilter,
  handleFilter,
  referenceNumber,
  setReferenceNumber,
}: IFilterProps) => {
  const { t } = useTranslation();
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return (
    <div className='p-6 md:w-[465px]'>
      <div className='w-full mb-5'>
        <input
          type='text'
          value={englishToPersian(referenceNumber ?? '')}
          onChange={(e) => {
            const val = e.target.value;
            const english = persianToEnglish(val);
            setReferenceNumber(english);
          }}
          placeholder={t('credit:tracking_number')}
          className='border border-border-color w-full h-[38px] px-3 rounded-sm outline-0 placeholder:text-right'
          dir='ltr'
          inputMode='numeric'
        />
      </div>
      <div className='w-full  mb-5'>
        <DatePicker
          value={fromDate}
          onChange={setFromDate}
          calendar={persian}
          locale={persian_fa}
          maxDate={today}
          portal
          className='w-full'
          containerClassName='w-full'
          inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          placeholder={t('home:from_date')}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span>{value || t('home:from_date')}</span>

              <Image
                src='/assets/icons/calendar.svg'
                alt='calender'
                width={20}
                height={20}
              />
            </div>
          )}
        />
      </div>

      <div className='w-full  mb-5'>
        <DatePicker
          value={toDate}
          onChange={setToDate}
          calendar={persian}
          locale={persian_fa}
          maxDate={today}
          portal
          className='w-full'
          containerClassName='w-full'
          inputClass='border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-400'
          placeholder={t('home:to_date')}
          render={(value, openCalendar) => (
            <div
              className='border border-gray-300 rounded-md w-full px-3 py-2 flex items-center justify-between cursor-pointer'
              onClick={openCalendar}
            >
              <span>{value || t('home:to_date')}</span>

              <Image
                src='/assets/icons/calendar.svg'
                alt='calender'
                width={20}
                height={20}
              />
            </div>
          )}
        />
      </div>

      <div className='flex justify-between gap-4'>
        <Button
          variant='outline'
          onClick={handleRemoveFilter}
          className='w-[199px]'
        >
          {t('home:remove_filter')}
        </Button>
        <Button onClick={handleFilter} className='w-[199px]'>
          {t('home:get_report')}
        </Button>
      </div>
    </div>
  );
};

export default FilterRequest;
