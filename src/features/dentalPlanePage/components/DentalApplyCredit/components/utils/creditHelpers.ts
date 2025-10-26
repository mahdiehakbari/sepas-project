import { IGetCreditStepTitleProps } from '../types';

export const getCreditStepTitle = ({
  t,
  isAuthenticated,
  creditLoading,
  budgetData,
  showBill,
  isProfileStep,
}: IGetCreditStepTitleProps) => {
  if (!isAuthenticated || creditLoading) return undefined;
  if (!budgetData) return t('credit:validation_result_budget');
  if (showBill) return t('credit:paying_subscription');
  if (isProfileStep) return t('profile:complete_profile');
  return t('credit:apply_credit');
};
