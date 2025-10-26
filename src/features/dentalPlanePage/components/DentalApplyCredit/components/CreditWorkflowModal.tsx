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
    // props passthrough
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
    setProfileData,
  } = workflow;

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
          onSuccess={(data) => {
            setProfileData(data);
            setShowCreditNoteModal(true);
          }}
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
            <PayingSubScription
              feePercentage={feePercentage}
              amountReceivedValue={amountReceivedValue}
            />
          ) : (
            <InquiringBudget
              setShowBill={setShowBill}
              budgetData={budgetData}
              budgetCalcData={budgetCalcData}
              setFeePercentage={setFeePercentage}
              feePercentage={feePercentage}
              setAmountReceivedValue={setAmountReceivedValue}
              amountReceivedValue={amountReceivedValue}
            />
          )}
        </>
      )}
    </ResponsiveModal>
  );
};
