export interface IPayingSubscriptionProps {
  feePercentage: number;
  amountReceivedValue: number;
  setIsOpenModal: (value: boolean) => void;
  setShowCreditNoteModal: (value: boolean) => void;
  setShowBill: (value: boolean) => void;
  setPaymentReceiptStep: (value: number) => void;
  setBudgetData: (value: null | number) => void;
}
