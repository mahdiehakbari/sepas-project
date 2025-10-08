import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IProfileFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  birthDate: string;
  gender: string;
  email: string;
  iban: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface InputProps {
  label: string;
  name: keyof IProfileFormValues;
  register: UseFormRegister<IProfileFormValues>;
  required?: boolean;
  type?: string;
  full?: boolean;
  errors: FieldErrors<IProfileFormValues>;
}
