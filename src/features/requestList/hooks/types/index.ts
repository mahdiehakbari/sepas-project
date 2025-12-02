import { IRequestsData } from '@/app/panel/requestList/types';
import DateObject from 'react-date-object';

export interface ICreditRequestQuery {
  pageNumber: number;
  pageSize: number;
  statuses?: string[];
  planName?: string;
  createdFrom?: string;
  createdTo?: string;
}
export interface IFetchOptions {
  page: number;
  fromDate: DateObject | null;
  toDate: DateObject | null;
  setLoading: (v: boolean) => void;
  setData: (v: IRequestsData | null) => void;
}

export interface IFilterParams {
  pageNumber: number;
  pageSize: number;
  createdFrom?: string;
  createdTo?: string;
  customerIds?: string[];
  merchantIds?: string[];
  referenceNumber?: number | null;
}
