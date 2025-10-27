import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
interface IAddress {
  id: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  details: string;
  postalCode: string;
}

export interface IProfileFormValues {
  phoneNumber?: string;
  fullName?: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalId: string;
  birthDate: string;
  gender: string;
  email?: string;
  iban?: string;
  province: string;
  cityId: string;
  postalCode: string;
  addressDetails: string;
  address?: IAddress;
}

export interface InputProps {
  label: string;
  name: keyof IProfileFormValues;
  register: UseFormRegister<IProfileFormValues>;
  required?: boolean;
  type?: string;
  full?: boolean;
  errors: FieldErrors<IProfileFormValues>;
  textError: string;
  rules?: RegisterOptions<IProfileFormValues, keyof IProfileFormValues>;
}
