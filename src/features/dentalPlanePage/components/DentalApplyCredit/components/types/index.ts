import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { IFeeConfiguration } from '../../FirstTab/types';

export interface ICreditWorkflowModalProps {
  isOpenModal: boolean;
  creditLoading: boolean;
  showBill: boolean;
  token?: string;
  budgetData: number | null;
  setIsOpenModal: (value: boolean) => void;
  setShowBill: (value: boolean) => void;
  setIsOpenLoginModal: (value: boolean) => void;
  setShowCreditNoteModal: (value: boolean) => void;
  setIsOpenOtpModal: (value: boolean) => void;
  setFeePercentage: (value: number) => void;
  userProfile: IProfileFormValues | null;
  budgetCalcData: IFeeConfiguration[];
  feePercentage: number;
  handleBudgetLoading: () => void;
  handleProfileBack: () => void;
  isOpenLoginModal: boolean;
  showCreditNoteModal: boolean;
  isOpenOtpModal: boolean;
  setAmountReceivedValue: (value: number) => void;
  amountReceivedValue: number;
  showProfileModal: boolean;
  setShowProfileModal: (value: boolean) => void;
  setBudgetData: (value: number | null) => void;
}

export interface IGetCreditStepTitleProps {
  t: (key: string) => string;
  isAuthenticated: boolean;
  creditLoading: boolean;
  budgetData?: number | undefined | null;
  showBill: boolean;
  isProfileStep: boolean;
}
