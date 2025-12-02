import { DateObject } from 'react-multi-date-picker';

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IAcceptorData {
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}

export interface IMerchantData {
  businessName: string;
  firstName: string;
  id: string;
  lastName: string;
  nationalId: string;
}

export interface IFilteredProps {
  acceptorName: ISelectOption[];
  setAcceptorName: (value: ISelectOption[]) => void;
  fromDate: DateObject | null;
  setFromDate: (value: DateObject | null) => void;
  toDate: DateObject | null;
  setToDate: (value: DateObject | null) => void;
  handleFilter: () => void;
  placeholderText: string;
  acceptorData: IAcceptorData[];
  handleRemoveFilter: () => void;
  setReferenceNumber: (value: string | null) => void;
  referenceNumber: string | null;
}
