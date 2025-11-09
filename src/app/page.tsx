import { BannerSection, CreditPlans } from '@/features/mainPage';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'دنتالیت',
  description: 'دنتالیت',
};

export default function Home() {
  return (
    <Fragment>
      <BannerSection />
      <CreditPlans />
    </Fragment>
  );
}
