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
  setIsOpenOtpModal: (value: boolean) => void;
  setFeePercentage: (value: number) => void;
  userProfile: IProfileFormValues | null;
  budgetCalcData: IFeeConfiguration[];
  feePercentage: number;
  handleBudgetLoading: () => void;
  handleProfileBack: () => void;
  isOpenLoginModal: boolean;
  isOpenOtpModal: boolean;
  setAmountReceivedValue: (value: number) => void;
  amountReceivedValue: number;
  showProfileModal: boolean;
  setShowProfileModal: (value: boolean) => void;
}
