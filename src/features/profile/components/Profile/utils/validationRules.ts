export const validationRules = (t: {
  (key: string): string;
  (arg0: string): unknown;
}) => ({
  mobile: {
    required: t('profile:field_required'),
    pattern: { value: /^[0-9]*$/, message: t('profile:only_numbers_allowed') },
    validate: (value?: string) => {
      if (!value) return true;
      return value.length === 11 || t('profile:mobile_must_be_11_digits');
    },
  },

  nationalId: {
    required: t('dental-society:field_required'),
    pattern: {
      value: /^[0-9]{10}$/,
      message: t('dental-society:national_code_invalid'),
    },
    validate: (value?: string) => {
      if (!value) return true;
      return (
        /^\d{10}$/.test(value) || t('dental-society:national_code_invalid')
      );
    },
  },
});
