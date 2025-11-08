import { IFeeConfiguration } from '../../../FirstTab/types';

export interface IInquiringBudgetProps {
  setShowBill: (value: boolean) => void;
  budgetData: null | number;
  budgetCalcData: IFeeConfiguration[];
  setFeePercentage: (value: number) => void;
  feePercentage: number;
  setAmountReceivedValue: (value: number) => void;
  amountReceivedValue: number;
  setCreditRequestId: (value: string) => void;
  setBudgetData: (value: number | null) => void;
}
