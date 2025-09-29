import i18n from '@/i18n';

export type CreditItem = {
  src: string;
  alt: string;
  href: string;
  title: string;
};

export const CreditItems = [
  {
    src: '/assets/home-image/dentistry.svg',
    alt: 'dentistry',
    href: '#',
    title: i18n.t('home:dentistry'),
  },
  {
    src: '/assets/home-image/insurance.svg',
    alt: 'insurance',
    href: '#',
    title: i18n.t('home:services_insurance'),
  },
  {
    src: '/assets/home-image/travel.svg',
    alt: 'travel',
    href: '#',
    title: i18n.t('home:tourism_travel'),
  },
  {
    src: '/assets/home-image/car.svg',
    alt: 'car',
    href: '#',
    title: i18n.t('home:car_parts'),
  },
];
