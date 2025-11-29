import DateObject from 'react-date-object';

export interface IFilterProps {
  fromDate: DateObject | null;
  setFromDate: (value: DateObject | null) => void;
  toDate: DateObject | null;
  setToDate: (value: DateObject | null) => void;
  handleRemoveFilter: () => void;
  handleFilter: () => void;
}
