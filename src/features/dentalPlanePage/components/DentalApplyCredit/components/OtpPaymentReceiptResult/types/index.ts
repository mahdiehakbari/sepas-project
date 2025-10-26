export interface IOtpPaymentReceiptResult {
  setIsOpenModal: (value: boolean) => void;
  setShowCreditNoteModal: (value: boolean) => void;
  setShowBill: (value: boolean) => void;
  setBudgetData: (value: null | number) => void;
  setPaymentReceiptStep: (value: number) => void;
}
