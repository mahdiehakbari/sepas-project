'use client';

import { Accordion } from '@/sharedComponent/ui';
import { useState, useEffect, useRef } from 'react';
import { DentalBanner } from './components/DentalBanner/DentalBanner';
import { DentalPlaneContent } from './components/DentalPlaneContent/DentalPlaneContent';
import { DentalApplyCredit } from './components/DentalApplyCredit/DentalApplyCredit';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  API_CUSTOMER_CREDIT,
  API_CUSTOMER_CREDIT_COMMAND,
} from '@/config/api_address.config';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function DentalPlaneClient() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [budgetData, setBudgetData] = useState<number | null>(null);
  const [showBill, setShowBill] = useState(false);
  const [paymentReceiptStep, setPaymentReceiptStep] = useState(0);
  const [creditRequestId, setCreditRequestId] = useState('');
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const [feePercentage, setFeePercentage] = useState(0);
  const [modalLoading, setModalLoading] = useState(true);
  const searchParams = useSearchParams();
  const token = Cookies.get('token');

  const requestId = searchParams.get('requestId');
  const type = searchParams.get('type');
  const tokenHeader = token ? `Bearer ${token}` : '';
  const hasFetched = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasFetched.current) return;
    if (!requestId) return;

    hasFetched.current = true;
    if (requestId && type === '1') {
      setModalLoading(true);
      setIsOpenModal(true);
      axios
        .get(`${API_CUSTOMER_CREDIT}/${requestId}`, {
          headers: { Authorization: tokenHeader },
        })
        .then((resp) => {
          setCreditRequestId(requestId as string);
          setShowBill(true);
          setIsOpenModal(true);
          setShowCreditNoteModal(false);
          setBudgetData(resp.data.requestedAmount);
          setFeePercentage(resp.data.subscriptionFee);
          localStorage.setItem('payment_modal_shown', 'true');
          setModalLoading(false);
        })
        .catch((err) => {
          setModalLoading(false);
          setIsOpenModal(false);
          toast.error(t('credit:unknown_error'));
        });
    } else if (requestId && type === '2') {
      setModalLoading(true);
      setIsOpenModal(true);
      if (requestId) {
        setCreditRequestId(requestId);
      }

      setBudgetData(100);

      axios
        .post(
          `${API_CUSTOMER_CREDIT_COMMAND}/${requestId}/request-bajet-otp`,
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
          setModalLoading(false);
          // حذف payment_result بعد از استفاده
          // localStorage.removeItem('payment_result');
        })
        .catch((err) => {
          toast.error(t('credit:unknown_error'));
          setModalLoading(false);
          setIsOpenModal(false);
        });
    }
  }, [requestId, type]);

  const scroll = searchParams.get('scroll');
  useEffect(() => {
    if (scroll === 'faq') {
      const el = document.getElementById('faq-section');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [scroll]);

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
        modalLoading={modalLoading}
        setModalLoading={setModalLoading}
      />
      <div className='mb-12' id='faq-section'>
        <Accordion />
      </div>
    </div>
  );
}
