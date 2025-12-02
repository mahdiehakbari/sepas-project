import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { IProfileFormValues } from '../../types';

interface ILocationItem {
  id: string;
  name: string;
}

export interface IAddressInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  provinces: ILocationItem[];
  cities: ILocationItem[];
  handleProvinceChange: (provinceId: string | number) => void;
}

export interface IBankInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
}

export interface IPersonalInfoSectionProps {
  userData?: IProfileFormValues | null;
  t: (key: string) => string;
  register: UseFormRegister<IProfileFormValues>;
  errors: FieldErrors<IProfileFormValues>;
  control: Control<IProfileFormValues>;
  phoneNumber: string;
}
