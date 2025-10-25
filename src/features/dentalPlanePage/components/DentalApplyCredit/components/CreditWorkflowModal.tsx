'use client';

import { useTranslation } from 'react-i18next';
import { ICreditWorkflowModalProps } from './types';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { InquiringBudget } from './InquiringBudget/InquiringBudget';
import { PayingSubScription } from './PayingSubScription/PayingSubScription';
import { CreditNoteModal } from './CreditNoteModal/CreditNoteModal';
import { PhoneNumberModal } from '@/features/layout';
import { ProfileForm } from '@/features/profile';
import { OtpModal } from '@/features/layout/components/Auth/OTPComponent/OtpModal';

export const CreditWorkflowModal = ({
  isOpenModal,
  token,
  creditLoading,
  budgetData,
  setIsOpenModal,
  userProfile,
  showBill,
  setShowBill,
  budgetCalcData,
  setFeePercentage,
  feePercentage,
  handleBudgetLoading,
  isOpenLoginModal,
  setIsOpenLoginModal,
  setIsOpenOtpModal,
  isOpenOtpModal,
  setAmountReceivedValue,
  amountReceivedValue,
  showProfileModal,
  setShowProfileModal,
}: ICreditWorkflowModalProps) => {
  const { t } = useTranslation();
  function handleProfileBack(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ResponsiveModal
      isOpen={isOpenModal}
      title={
        !token || creditLoading == true
          ? undefined
          : budgetData == null
          ? t('credit:validation_result_budget')
          : showBill == true
          ? t('credit:paying_subscription')
          : t('credit:apply_credit')
      }
      onClose={() => setIsOpenModal(false)}
    >
      {token && userProfile ? (
        <>
          {budgetData ? (
            <>
              {showBill == true ? (
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
          ) : (
            <CreditNoteModal
              handleBudgetLoading={handleBudgetLoading}
              creditLoading={creditLoading}
            />
          )}
        </>
      ) : !token && !userProfile ? (
        <>
          {isOpenLoginModal && (
            <PhoneNumberModal
              setIsOpenLoginModal={setIsOpenLoginModal}
              setIsOpenOtpModal={setIsOpenOtpModal}
              setIsOpenModal={setIsOpenModal}
            />
          )}
          {isOpenOtpModal && (
            <OtpModal
              name='credit'
              setIsOpenOtpModal={setIsOpenOtpModal}
              setIsOpenLoginModal={setIsOpenLoginModal}
              setIsOpenModal={setIsOpenModal}
              setShowProfileModal={setShowProfileModal}
            />
          )}
        </>
      ) : (
        token &&
        !userProfile &&
        showProfileModal && (
          <>
            <ProfileForm
              name='credit'
              handleBack={handleProfileBack}
              setIsOpenModal={setIsOpenModal}
            />
          </>
        )
      )}
    </ResponsiveModal>
  );
};
