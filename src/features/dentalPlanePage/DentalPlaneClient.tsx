'use client';

import { Accordion } from '@/sharedComponent/ui';
import { useState, useEffect } from 'react';
import { DentalBanner } from './components/DentalBanner/DentalBanner';
import { DentalPlaneContent } from './components/DentalPlaneContent/DentalPlaneContent';
import { DentalApplyCredit } from './components/DentalApplyCredit/DentalApplyCredit';

export default function DentalPlaneClient() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const paymentStatus = localStorage.getItem('payment-status');
  useEffect(() => {
    if (paymentStatus == 'canceled') {
      setIsOpenModal(true);
      localStorage.removeItem('payment-status');
    }
  }, [paymentStatus]);

  return (
    <div className='max-w-4xl mx-auto px-6 md:px-0'>
      <DentalBanner />
      <DentalPlaneContent />
      <DentalApplyCredit
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
      />
      <div className='mb-12'>
        <Accordion />
      </div>
    </div>
  );
}
