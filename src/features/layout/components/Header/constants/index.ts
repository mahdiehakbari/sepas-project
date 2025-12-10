import i18n from '@/i18n';
import { NavItem } from '../types';

export const getNavItems = (): NavItem[] => [
  { id: 1, label: i18n.t('home:main_page'), href: '/' },
  {
    id: 2,
    label: i18n.t('dentist_list:dentist_list'),
    href: '/listOfDentists',
  },
  // { id: 3, label: i18n.t('home:credit_system'), href: '/' },
  { id: 4, label: i18n.t('home:process_receiving_credit'), href: '/services/dentalPlan#process_receiving' },
  // { id: 5, label: i18n.t('home:video_training'), href: '/' },
  {
    id: 6,
    label: i18n.t('home:Frequently'),
    href: '/services/dentalPlan?scroll=faq',
  },
];
