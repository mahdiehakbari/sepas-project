import { FieldValues } from 'react-hook-form';
import { ISelectInputProps } from './types';

export const SelectInput = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  errors,
  onChange,
  rules,
}: ISelectInputProps<T>) => {
  return (
    <div className='flex flex-col'>
      <select
        {...register(name, rules)}
        onChange={(e) => {
          register(name, rules).onChange(e);
          onChange?.(e.target.value);
        }}
        className={`bg-white border rounded-lg px-3 py-2 text-right placeholder-gray-400 
                    focus:outline-none focus:ring-2
                    ${
                      errors?.[name]
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
      >
        <option value=''>{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {errors?.[name]?.message && (
        <span className='text-red-500 text-sm mt-1'>
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};
