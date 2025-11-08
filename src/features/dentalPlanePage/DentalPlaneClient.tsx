'use client';

import { Accordion } from '@/sharedComponent/ui';
import { useState, useEffect } from 'react';
import { DentalBanner } from './components/DentalBanner/DentalBanner';
import { DentalPlaneContent } from './components/DentalPlaneContent/DentalPlaneContent';
import { DentalApplyCredit } from './components/DentalApplyCredit/DentalApplyCredit';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_CUSTOMER_CREDIT_COMMAND } from '@/config/api_address.config';

export interface PaymentResult {
  status: string;
  rrn: string;
  message: string;
  amount: number;
  creditRequestId?: string;
  ipgTransactionId?: string;
}

export default function DentalPlaneClient() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResult | null>(null);
  const [budgetData, setBudgetData] = useState<number | null>(null);
  const [showBill, setShowBill] = useState(false);
  const [paymentReceiptStep, setPaymentReceiptStep] = useState(0);
  const [creditRequestId, setCreditRequestId] = useState('');
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const [feePercentage, setFeePercentage] = useState(0);
  const token = Cookies.get('token');

  useEffect(() => {
    const paymentResult = localStorage.getItem('payment_result');
    const modalShown = localStorage.getItem('payment_modal_shown');

    localStorage.setItem('payment_modal_shown', 'true');

    if (!paymentResult) return;

    let parsed: PaymentResult | null = null;

    try {
      parsed = JSON.parse(paymentResult);
    } catch (err) {
      console.error('Failed to parse payment_result from localStorage', err);
      return;
    }

    if (!parsed) return;

    console.log(parsed, 'aaa');

    if (parsed.status === 'false' && modalShown) {
      axios
        .post(
          API_CUSTOMER_CREDIT_COMMAND,
          {
            amount: parsed.amount,
            description: 'Credit request details',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((resp) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          setCreditRequestId(parsed?.creditRequestId);
          setShowBill(true);
          setIsOpenModal(true);
          setShowCreditNoteModal(false);
          setBudgetData(parsed.amount);
          setFeePercentage(parsed?.amount);
          // setPaymentReceiptStep(0);

          localStorage.removeItem('payment_result');
        })
        .catch(() => {});
    } else if (parsed.status === 'true' && modalShown) {
      setPaymentData(parsed);

      if (parsed.creditRequestId) {
        setCreditRequestId(parsed.creditRequestId);
      }

      setBudgetData(Number(parsed.amount));

      axios
        .post(
          `${API_CUSTOMER_CREDIT_COMMAND}/${parsed.creditRequestId}/request-bajet-otp`,
          {},
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

          // حذف payment_result بعد از استفاده
          localStorage.removeItem('payment_result');
        })
        .catch((err) => {
          console.error('Error requesting budget OTP', err);
        });
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
        feePercentage={feePercentage}
        setFeePercentage={setFeePercentage}
      />
      <div className='mb-12'>
        <Accordion />
      </div>
    </div>
  );
}
