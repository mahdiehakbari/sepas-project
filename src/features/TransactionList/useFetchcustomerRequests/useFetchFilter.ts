import axios, { AxiosRequestConfig } from 'axios';
import { DateObject } from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import qs from 'qs';
import { IFilterParams } from './types';
import { API_PURCHASE_QUERY } from '@/config/api_address.config';

export function useFilter<T>(
  token: string | undefined,
  setRequestData: (data: T) => void,
) {
  const startOfDay = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const endOfDay = (date: Date) => {
    date.setHours(23, 59, 59, 999);
    return date;
  };

  const filterData = async (
    fromDate: DateObject | null,
    toDate: DateObject | null,
    merchantIds: string[] = [],
    pageNumber: number = 1,
    pageSize: number = 10,
  ) => {
    const createdFrom = fromDate
      ? startOfDay(fromDate.convert(gregorian).toDate()).toISOString()
      : undefined;

    const createdTo = toDate
      ? endOfDay(toDate.convert(gregorian).toDate()).toISOString()
      : undefined;

    const params: IFilterParams = { pageNumber, pageSize };
    if (createdFrom) params.createdFrom = createdFrom;
    if (createdTo) params.createdTo = createdTo;
    if (merchantIds.length > 0) params.merchantIds = merchantIds;

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    try {
      const res = await axios.get<T>(`${API_PURCHASE_QUERY}`, config);
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return { filterData };
}
