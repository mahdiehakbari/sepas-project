export const localesNS = ['home', 'dental_plane', 'login', 'profile'] as const;
export type LocaleNS = (typeof localesNS)[number];

export const languages = ['en', 'fa'] as const;
export type Language = (typeof languages)[number];
