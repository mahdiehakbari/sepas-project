// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validationRules = (t: any) => ({
  mobile: {
    required: t('profile:field_required'),
    pattern: {
      value: /^[0-9]*$/,
      message: t('profile:only_numbers_allowed'),
    },
    validate: (value: string) =>
      value.length === 11 || t('profile:mobile_must_be_11_digits'),
  },

  nationalCode: {
    required: t('profile:field_required'),
    pattern: {
      value: /^[0-9]{10}$/,
      message: t('profile:national_code_invalid'),
    },
    validate: (value: string) => {
      if (!/^\d{10}$/.test(value)) return t('profile:national_code_invalid');
      const check = +value[9];
      const sum =
        value
          .split('')
          .slice(0, 9)
          .reduce((acc, num, i) => acc + +num * (10 - i), 0) % 11;
      return (
        (sum < 2 && check === sum) ||
        (sum >= 2 && check === 11 - sum) ||
        t('profile:national_code_invalid')
      );
    },
  },
});
