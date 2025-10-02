import i18n from '@/i18n';
import { TTabItems } from '../types';
import { FirstTab } from '../FirstTab/FirstTab';

export const tabsItem: TTabItems[] = [
  {
    tabImage: '/assets/dental-plane/tejarat_bank_logo.svg',
    label: i18n.t('dental_plane:tejarat_bank'),
    content: <FirstTab />,
  },
  {
    tabImage: '/assets/dental-plane/saman-bank-logo.svg',
    label: i18n.t('dental_plane:saman_bank'),
    content: 'محتوای تب دوم',
  },
  {
    tabImage: '/assets/dental-plane/meli-bank-logo.svg',
    label: i18n.t('dental_plane:meli_bank'),
    content: 'محتوای تب سوم',
  },
];
