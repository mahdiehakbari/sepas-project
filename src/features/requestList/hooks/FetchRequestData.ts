import axios, { AxiosRequestConfig } from 'axios';
import gregorian from 'react-date-object/calendars/gregorian';
import { API_CUSTOMER_CREDIT_QUERY } from '@/config/api_address.config';
import DateObject from 'react-date-object';

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
    pageNumber: number = 1,
    pageSize: number = 10,
  ) => {
    const createdFrom = fromDate
      ? startOfDay(fromDate.convert(gregorian).toDate()).toISOString()
      : undefined;

    const createdTo = toDate
      ? endOfDay(toDate.convert(gregorian).toDate()).toISOString()
      : undefined;

    const params = {
      pageNumber,
      pageSize,
      createdFrom,
      createdTo,
    };

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
      params,
    };

    try {
      const res = await axios.get<T>(`${API_CUSTOMER_CREDIT_QUERY}`, config);
      setRequestData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return { filterData };
}
