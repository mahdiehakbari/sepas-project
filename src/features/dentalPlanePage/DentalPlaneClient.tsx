'use client';

import { Accordion } from '@/sharedComponent/ui';
import { useState, useEffect } from 'react';
import { DentalBanner } from './components/DentalBanner/DentalBanner';
import { DentalPlaneContent } from './components/DentalPlaneContent/DentalPlaneContent';
import { DentalApplyCredit } from './components/DentalApplyCredit/DentalApplyCredit';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_CUSTOMER_CREDIT_COMMAND } from '@/config/api_address.config';

export default function DentalPlaneClient() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [budgetData, setBudgetData] = useState<number | null>(null);
  const [showBill, setShowBill] = useState(false);
  const [paymentReceiptStep, setPaymentReceiptStep] = useState(0);
  const [creditRequestId, setCreditRequestId] = useState('');
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const cookie = Cookies.get('payment_result');
    const modalShown = localStorage.getItem('payment_modal_shown');

    if (cookie && !modalShown) {
      try {
        const parsed = JSON.parse(cookie);
        setPaymentData(parsed);

        if (parsed.creditRequestId) {
          setCreditRequestId(parsed.creditRequestId);
        }

        if (parsed.status === 'true' && parsed.creditRequestId) {
          setBudgetData(Number(parsed.amount));
          axios
            .post(
              `${API_CUSTOMER_CREDIT_COMMAND}/${parsed.creditRequestId}/complete-ipg-payment`,
              {
                ipgTransactionId: parsed.ipgTransactionId,
                isSuccessful: true,
                errorMessage: 'Payment declined by bank',
              },
              {
                headers: {
                  Authorization: token ? `Bearer ${token}` : '',
                },
              },
            )
            .then((resp) => {
              setIsOpenModal(true);
              setShowBill(true);
              setShowCreditNoteModal(false);
              setPaymentReceiptStep(2);
              setIsOpenModal(true);
              setShowBill(true);
            })
            .catch((err) => {});
        }

        localStorage.setItem('payment_modal_shown', 'true');
      } catch (err) {}
    }
  }, []);

  return (
    <div className='max-w-4xl mx-auto px-6 md:px-0'>
      <DentalBanner />
      <DentalPlaneContent />
      <DentalApplyCredit
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        budgetData={budgetData}
        setBudgetData={setBudgetData}
        showBill={showBill}
        setShowBill={setShowBill}
        paymentReceiptStep={paymentReceiptStep}
        setPaymentReceiptStep={setPaymentReceiptStep}
        creditRequestId={creditRequestId}
        setCreditRequestId={setCreditRequestId}
        showCreditNoteModal={showCreditNoteModal}
        setShowCreditNoteModal={setShowCreditNoteModal}
      />
      <div className='mb-12'>
        <Accordion />
      </div>
    </div>
  );
}
