import { UseFormRegister } from 'react-hook-form';

export interface IInputProps<T extends Record<string, unknown>> {
  label: string;
  name: keyof T; // 👈 باعث میشه autocomplete هم بگیری
  register: UseFormRegister<T>;
  required?: boolean;
  type?: string;
  full?: boolean;
}
