import { DentalPlaneContent } from '@/features/DentalPlane';
import { DentalApplyCredit } from '@/features/DentalPlane/components/ِDentalApplyCredit';
import { Accordion } from '@/sharedComponent/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DentalPlane',
  description: 'DentalPlane',
};
export default function DentalPlane() {
  return (
    <div className='max-w-4xl mx-auto px-6 md:px-0'>
      <DentalPlaneContent />
      <DentalApplyCredit />
      <div className='mb-12'>
        <Accordion />
      </div>
    </div>
  );
}
