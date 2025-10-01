import { DentalPlaneContent } from '@/features/DentalPlane';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'DentalPlane',
  description: 'DentalPlane',
};
export default function DentalPlane() {
  return (
    <Fragment>
      <DentalPlaneContent />
    </Fragment>
  );
}
