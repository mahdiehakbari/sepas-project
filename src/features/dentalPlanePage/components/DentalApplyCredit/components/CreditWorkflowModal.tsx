'use client';

import { PhoneNumberModal } from '@/features/layout';
import { OtpModal } from '@/features/layout/components/Auth/OTPComponent/OtpModal';
import { ProfileForm } from '@/features/profile';
import { CreditNoteModal } from './CreditNoteModal/CreditNoteModal';
import { InquiringBudget } from './InquiringBudget/InquiringBudget';
import { PayingSubScription } from './PayingSubScription/PayingSubScription';
import { ICreditWorkflowModalProps } from './types';
import { useCreditWorkflow } from './hooks/useCreditWorkflow';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { PaymentReceipt } from './PaymentReceipt/PaymentReceipt';
import { OtpPaymentReceipt } from './OtpPaymentReceipt/OtpPaymentReceipt';
import { OtpPaymentReceiptResult } from './OtpPaymentReceiptResult/OtpPaymentReceiptResult';
import { useState } from 'react';

export const CreditWorkflowModal = (props: ICreditWorkflowModalProps) => {
  const workflow = useCreditWorkflow(props);
  const {
    modalTitle,
    handleClose,
    handleProfileBack,
    isLoginStep,
    isProfileStep,
    isReady,
    shouldStartAtCreditNote,
    isOpenLoginModal,
    isOpenOtpModal,
    setIsOpenLoginModal,
    setIsOpenOtpModal,
    setShowProfileModal,
    setShowCreditNoteModal,
    handleBudgetLoading,
    creditLoading,
    budgetData,
    showBill,
    setShowBill,
    budgetCalcData,
    setFeePercentage,
    feePercentage,
    setAmountReceivedValue,
    amountReceivedValue,
    paymentReceiptStep,
    setPaymentReceiptStep,
    creditRequestId,
    setCreditRequestId,
  } = workflow;

  const [ipgTransactionId, setIpgTransactionId] = useState('');

  return (
    <ResponsiveModal
      isOpen={props.isOpenModal}
      title={modalTitle}
      onClose={handleClose}
    >
      {/* 🔹 Login flow */}
      {isLoginStep && (
        <>
          {isOpenLoginModal && (
            <PhoneNumberModal
              setIsOpenLoginModal={setIsOpenLoginModal}
              setIsOpenOtpModal={setIsOpenOtpModal}
              setIsOpenModal={props.setIsOpenModal}
            />
          )}
          {isOpenOtpModal && (
            <OtpModal
              name='credit'
              setIsOpenOtpModal={setIsOpenOtpModal}
              setIsOpenLoginModal={setIsOpenLoginModal}
              setIsOpenModal={props.setIsOpenModal}
              setShowProfileModal={setShowProfileModal}
            />
          )}
        </>
      )}

      {/* 🔹 Profile flow */}
      {isProfileStep && (
        <ProfileForm
          name='credit'
          handleBack={handleProfileBack}
          setShowProfileModal={setShowProfileModal}
          setShowCreditNoteModal={setShowCreditNoteModal}
        />
      )}

      {/* 🔹 Credit flow */}
      {isReady && (
        <>
          {shouldStartAtCreditNote ? (
            <CreditNoteModal
              handleBudgetLoading={handleBudgetLoading}
              creditLoading={creditLoading}
            />
          ) : budgetData && showBill ? (
            <>
              {paymentReceiptStep == 0 && (
                <PayingSubScription
                  feePercentage={feePercentage}
                  amountReceivedValue={amountReceivedValue}
                  setIsOpenModal={props.setIsOpenModal}
                  setShowCreditNoteModal={props.setShowCreditNoteModal}
                  setShowBill={props.setShowBill}
                  setBudgetData={props.setBudgetData}
                  setPaymentReceiptStep={setPaymentReceiptStep}
                  creditRequestId={creditRequestId}
                  setIpgTransactionId={setIpgTransactionId}
                />
              )}
              {paymentReceiptStep == 1 && (
                <>
                  <PaymentReceipt
                    setPaymentReceiptStep={setPaymentReceiptStep}
                    creditRequestId={creditRequestId}
                    ipgTransactionId={ipgTransactionId}
                  />
                </>
              )}
              {paymentReceiptStep == 2 && (
                <>
                  <OtpPaymentReceipt
                    setPaymentReceiptStep={setPaymentReceiptStep}
                    creditRequestId={creditRequestId}
                  />
                </>
              )}
              {paymentReceiptStep == 3 && (
                <>
                  <OtpPaymentReceiptResult
                    setIsOpenModal={props.setIsOpenModal}
                    setShowCreditNoteModal={props.setShowCreditNoteModal}
                    setShowBill={props.setShowBill}
                    setBudgetData={props.setBudgetData}
                    setPaymentReceiptStep={setPaymentReceiptStep}
                  />
                </>
              )}
            </>
          ) : (
            <InquiringBudget
              setShowBill={setShowBill}
              budgetData={budgetData}
              budgetCalcData={budgetCalcData}
              setFeePercentage={setFeePercentage}
              feePercentage={feePercentage}
              setAmountReceivedValue={setAmountReceivedValue}
              amountReceivedValue={amountReceivedValue}
              setCreditRequestId={setCreditRequestId}
            />
          )}
        </>
      )}
    </ResponsiveModal>
  );
};
