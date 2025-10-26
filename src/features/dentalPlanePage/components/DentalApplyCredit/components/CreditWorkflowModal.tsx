// 'use client';

// import { useTranslation } from 'react-i18next';
// import { ICreditWorkflowModalProps } from './types';
// import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
// import { InquiringBudget } from './InquiringBudget/InquiringBudget';
// import { PayingSubScription } from './PayingSubScription/PayingSubScription';
// import { CreditNoteModal } from './CreditNoteModal/CreditNoteModal';
// import { PhoneNumberModal } from '@/features/layout';
// import { ProfileForm } from '@/features/profile';
// import { OtpModal } from '@/features/layout/components/Auth/OTPComponent/OtpModal';
// import { useState } from 'react';

// export const CreditWorkflowModal = ({
//   isOpenModal,
//   token,
//   creditLoading,
//   budgetData,
//   setIsOpenModal,
//   userProfile,
//   showBill,
//   setShowBill,
//   budgetCalcData,
//   setFeePercentage,
//   feePercentage,
//   handleBudgetLoading,
//   isOpenLoginModal,
//   setIsOpenLoginModal,
//   setIsOpenOtpModal,
//   isOpenOtpModal,
//   setAmountReceivedValue,
//   amountReceivedValue,
//   showProfileModal,
//   setShowProfileModal,
// }: ICreditWorkflowModalProps) => {
//   const { t } = useTranslation();
//   const handleProfileBack = () => {
//     setIsOpenModal(false);
//   };

//   const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);

//   return (
//     <ResponsiveModal
//       isOpen={isOpenModal}
//       title={
//         !token || creditLoading == true
//           ? undefined
//           : budgetData == null
//           ? t('credit:validation_result_budget')
//           : showBill == true
//           ? t('credit:paying_subscription')
//           : t('credit:apply_credit')
//       }
//       onClose={() => setIsOpenModal(false)}
//     >
//       {token && userProfile && showProfileModal == false ? (
//         <>
//           {budgetData && showCreditNoteModal == false ? (
//             <>
//               {showBill == true ? (
//                 <PayingSubScription
//                   feePercentage={feePercentage}
//                   amountReceivedValue={amountReceivedValue}
//                 />
//               ) : (
//                 <InquiringBudget
//                   setShowBill={setShowBill}
//                   budgetData={budgetData}
//                   budgetCalcData={budgetCalcData}
//                   setFeePercentage={setFeePercentage}
//                   feePercentage={feePercentage}
//                   setAmountReceivedValue={setAmountReceivedValue}
//                   amountReceivedValue={amountReceivedValue}
//                 />
//               )}
//             </>
//           ) : (
//             <CreditNoteModal
//               handleBudgetLoading={handleBudgetLoading}
//               creditLoading={creditLoading}
//             />
//           )}
//         </>
//       ) : !token && !userProfile && showProfileModal == false ? (
//         <>
//           {isOpenLoginModal && (
//             <PhoneNumberModal
//               setIsOpenLoginModal={setIsOpenLoginModal}
//               setIsOpenOtpModal={setIsOpenOtpModal}
//               setIsOpenModal={setIsOpenModal}
//             />
//           )}
//           {isOpenOtpModal && (
//             <OtpModal
//               name='credit'
//               setIsOpenOtpModal={setIsOpenOtpModal}
//               setIsOpenLoginModal={setIsOpenLoginModal}
//               setIsOpenModal={setIsOpenModal}
//               setShowProfileModal={setShowProfileModal}
//             />
//           )}
//         </>
//       ) : (
//         token &&
//         !userProfile &&
//         showProfileModal == true && (
//           <>
//             <ProfileForm
//               name='credit'
//               handleBack={handleProfileBack}
//               setShowProfileModal={setShowProfileModal}
//               setShowCreditNoteModal={setShowCreditNoteModal}
//             />
//           </>
//         )
//       )}
//     </ResponsiveModal>
//   );
// };
'use client';

import { useState, useMemo } from 'react';
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
  setShowCreditNoteModal,
  showCreditNoteModal,
}: ICreditWorkflowModalProps) => {
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState(userProfile);

  const isAuthenticated = Boolean(token);
  const hasProfile = Boolean(profileData);
  const isProfileStep = isAuthenticated && !hasProfile && showProfileModal;
  const isLoginStep = !isAuthenticated && !hasProfile && !showProfileModal;
  const isReady = isAuthenticated && hasProfile && !showProfileModal;

  const handleProfileBack = () => setIsOpenModal(false);

  const modalTitle = useMemo(() => {
    if (!isAuthenticated || creditLoading) return undefined;
    if (!budgetData) return t('credit:validation_result_budget');
    if (showBill) return t('credit:paying_subscription');
    return t('credit:apply_credit');
  }, [isAuthenticated, creditLoading, budgetData, showBill, t]);

  console.log(
    budgetData,
    showBill,
    'hiiii',
    showCreditNoteModal,
    !showCreditNoteModal,
  );
  return (
    <ResponsiveModal
      isOpen={isOpenModal}
      title={modalTitle}
      onClose={() => setIsOpenModal(false)}
    >
      {isReady && (
        <>
          {showCreditNoteModal && (
            <CreditNoteModal
              handleBudgetLoading={handleBudgetLoading}
              creditLoading={creditLoading}
            />
          )}

          {!showCreditNoteModal && (
            <>
              {budgetData && showBill == true ? (
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
        </>
      )}

      {isLoginStep && (
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
      )}

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
    </ResponsiveModal>
  );
};
