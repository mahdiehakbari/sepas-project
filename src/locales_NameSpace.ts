export const localesNS = [
  'home',
  'dental_plane',
  'login',
  'profile',
  'credit',
  'transaction_list',
  'request_list',
  'status',
] as const;
export type LocaleNS = (typeof localesNS)[number];

export const languages = ['en', 'fa'] as const;
export type Language = (typeof languages)[number];
