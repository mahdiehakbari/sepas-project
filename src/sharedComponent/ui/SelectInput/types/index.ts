import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface ISelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: { label: string; value: string }[];
  errors?: FieldErrors<T>;
  onChange?: (value: string | number) => void;
  rules?: RegisterOptions<T, Path<T>>;
}
