export interface IFeeConfiguration {
  id: string;
  minAmount: number;
  maxAmount: number;
  feePercentage: number;
  isActive: boolean;
  description?: string;
  createdAt?: string;
  modifiedAt?: string | null;
}

export interface IFirstTabProps {
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
  setShowCreditNoteModal: (value: boolean) => void;
  feePercentage: number;
  setFeePercentage: (value: number) => void;
  modalLoading: boolean;
}
