import { useState, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { ICreditWorkflowModalProps } from '../types';
import { getCreditStepTitle } from '../utils/creditHelpers';
import { useRouter } from 'next/navigation';

export const useCreditWorkflow = (
  props: Omit<ICreditWorkflowModalProps, 'isOpenModal'>,
) => {
  const {
    token,
    creditLoading,
    budgetData,
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
    showCreditNoteModal,
    setShowCreditNoteModal,
    setBudgetData,
    setIsOpenModal,
    paymentReceiptStep,
    setPaymentReceiptStep,
    creditRequestId,
    setCreditRequestId,
    modalLoading,
  } = props;

  const { t } = useTranslation();
  const router = useRouter();
  // --- Local states ---
  const [profileData, setProfileData] = useState(userProfile);

  const isLoggedIn = Cookies.get('isLoggedIn');
  const isAuthenticated = Boolean(token);

  // --- Derived flags ---
  const isProfileStep =
    isAuthenticated && isLoggedIn == 'false' && showProfileModal;
  const isLoginStep =
    !isAuthenticated &&
    (!isLoggedIn || isLoggedIn == 'false') &&
    !showProfileModal;
  const isReady = isAuthenticated && isLoggedIn == 'true';
  const shouldStartAtCreditNote = isReady && showCreditNoteModal;

  // --- Load profile from cookie ---
  useEffect(() => {
    if (!isAuthenticated) return;
    const storedProfile = Cookies.get('userProfile');
    const paymentResult = localStorage.getItem('payment_result');
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfileData(parsed);
        setShowProfileModal(false);
      } catch (err) {
        console.error('Error parsing userProfile cookie', err);
      }
    } else if (storedProfile && !paymentResult) {
      setShowCreditNoteModal(true);
    } else {
      setShowProfileModal(true);
    }

    if (isLoggedIn == 'true' && !paymentResult) {
      setShowCreditNoteModal(true);
      setShowBill(false);
    }
  }, [isAuthenticated]);

  // --- Handlers ---
  const handleProfileBack = useCallback(
    () => setIsOpenModal(false),
    [setIsOpenModal],
  );

  const handleClose = useCallback(() => {
    router.push('/services/dentalPlan');
    setPaymentReceiptStep(0);
    setCreditRequestId('');

    if (isProfileStep) {
      setIsOpenModal(false);
      setShowProfileModal(true);
      setShowCreditNoteModal(false);
      return;
    }

    if (isReady) {
      setShowCreditNoteModal(true);
      setShowBill(false);
      setBudgetData(null);
    } else {
      setShowCreditNoteModal(false);
      setShowProfileModal(false);
    }

    setIsOpenModal(false);
  }, [
    isProfileStep,
    isReady,
    setIsOpenModal,
    setShowProfileModal,
    setShowCreditNoteModal,
    setShowBill,
    setBudgetData,
  ]);

  // --- Title ---
  const modalTitle = useMemo(
    () =>
      getCreditStepTitle({
        t,
        isAuthenticated,
        creditLoading,
        budgetData,
        showBill,
        isProfileStep,
        paymentReceiptStep,
        shouldStartAtCreditNote,
        modalLoading,
      }),
    [
      isAuthenticated,
      creditLoading,
      budgetData,
      showBill,
      isProfileStep,
      t,
      paymentReceiptStep,
      shouldStartAtCreditNote,
      modalLoading,
    ],
  );

  return {
    // states
    profileData,
    setProfileData,
    paymentReceiptStep,
    setPaymentReceiptStep,
    creditRequestId,
    setCreditRequestId,

    // flags
    isAuthenticated,
    isLoggedIn,
    isProfileStep,
    isLoginStep,
    isReady,
    shouldStartAtCreditNote,

    // ui
    modalTitle,

    // handlers
    handleProfileBack,
    handleClose,

    // passthrough props
    creditLoading,
    budgetData,
    showBill,
    setShowBill,
    budgetCalcData,
    setFeePercentage,
    feePercentage,
    handleBudgetLoading,
    isOpenLoginModal,
    isOpenOtpModal,
    setIsOpenLoginModal,
    setIsOpenOtpModal,
    setShowProfileModal,
    setShowCreditNoteModal,
    setAmountReceivedValue,
    amountReceivedValue,
  };
};
