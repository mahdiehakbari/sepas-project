import { useState, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { ICreditWorkflowModalProps } from '../types';
import { getCreditStepTitle } from '../utils/creditHelpers';

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
  } = props;

  const { t } = useTranslation();

  // --- Local state ---
  const [profileData, setProfileData] = useState(userProfile);
  const isLoggedIn = Cookies.get('isLoggedIn');
  // --- Derived states ---
  const isAuthenticated = Boolean(token);
  // const hasProfile = Boolean(profileData);
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
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfileData(parsed);
        setShowProfileModal(false);
        setShowCreditNoteModal(true);
      } catch (err) {
        console.error('Error parsing userProfile cookie', err);
      }
    } else {
      setShowProfileModal(true);
    }
  }, [isAuthenticated]);

  // --- Handlers ---
  const handleProfileBack = useCallback(
    () => setIsOpenModal(false),
    [setIsOpenModal],
  );

  const handleClose = useCallback(() => {
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
      }),
    [isAuthenticated, creditLoading, budgetData, showBill, isProfileStep, t],
  );

  return {
    // states
    profileData,
    setProfileData,
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
