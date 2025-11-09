import { ReactNode } from 'react';

export type TTabItems = {
  label: string;
  content: ReactNode;
  tabImage: string;
};

export interface ICreditProps {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  budgetData: number | null;
  setBudgetData: (value: number | null) => void;
  showBill: boolean;
  setShowBill: (value: boolean) => void;
  paymentReceiptStep: number;
  setPaymentReceiptStep: (value: number) => void;
  creditRequestId: string;
  setCreditRequestId: (value: string) => void;
  showCreditNoteModal: boolean;
  setShowCreditNoteModal: (Value: boolean) => void;
  feePercentage: number;
  setFeePercentage: (value: number) => void;
  modalLoading: boolean;
}
