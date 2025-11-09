import DentalPlaneClient from '@/features/dentalPlanePage/DentalPlaneClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'طرح دندانپزشکی',
  description: 'طرح دندانپزشکی دنتالیت',
};

export default function DentalPlanePage() {
  return <DentalPlaneClient />;
}
