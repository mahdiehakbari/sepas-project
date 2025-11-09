import { IGetCreditStepTitleProps } from '../types';

export const getCreditStepTitle = ({
  t,
  isAuthenticated,
  creditLoading,
  budgetData,
  showBill,
  isProfileStep,
  paymentReceiptStep,
  shouldStartAtCreditNote,
  modalLoading,
}: IGetCreditStepTitleProps) => {
  if (!isAuthenticated || creditLoading || modalLoading) return undefined;
  if (shouldStartAtCreditNote) return t('credit:apply_credit');
  if (!shouldStartAtCreditNote && !budgetData)
    return t('credit:validation_result_budget');
  if (showBill && !paymentReceiptStep) return t('credit:paying_subscription');
  if (isProfileStep) return t('profile:complete_profile');
  if (paymentReceiptStep == 1) return t('credit:payment_receipt');
  if (paymentReceiptStep == 2) return t('credit:code_received_budget');
  if (paymentReceiptStep == 3) return undefined;
  return t('credit:apply_credit');
};
