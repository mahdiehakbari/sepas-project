import DentalPlaneClient from '@/features/dentalPlanePage/DentalPlaneClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DentalPlane',
  description: 'DentalPlane',
};

export default function DentalPlanePage() {
  return <DentalPlaneClient />;
}
