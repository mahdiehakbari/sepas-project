import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IProfileFormValues } from '../../types';

interface ILocationItem {
  id: string;
  name: string;
}

export interface IAddressInfoSectionProps {
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  provinces: ILocationItem[];
  cities: ILocationItem[];
  handleProvinceChange: (provinceId: string) => void;
}

export interface IBankInfoSectionProps {
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
}

export interface IPersonalInfoSectionProps {
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
}
