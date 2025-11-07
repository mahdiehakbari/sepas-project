import { TTabItems } from '../types';
import { FirstTab } from '../FirstTab/FirstTab';

export const getTabsItem = (
  isOpenModal: boolean,
  setIsOpenModal: (value: boolean) => void,
  setBudgetData: (value: number | null) => void,
  budgetData: number | null,
  showBill: boolean,
  setShowBill: (value: boolean) => void,
  paymentReceiptStep: number,
  setPaymentReceiptStep: (value: number) => void,
  creditRequestId: string,
  setCreditRequestId: (value: string) => void,
): TTabItems[] => [
  {
    tabImage: '/assets/dental-plane/tejarat_bank_logo.svg',
    label: 'dental_plane:tejarat_bank',
    content: (
      <FirstTab
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        budgetData={budgetData}
        setBudgetData={setBudgetData}
        showBill={showBill}
        setShowBill={setShowBill}
        paymentReceiptStep={paymentReceiptStep}
        setPaymentReceiptStep={setPaymentReceiptStep}
        creditRequestId={creditRequestId}
        setCreditRequestId={setCreditRequestId}
      />
    ),
  },
  // {
  //   tabImage: '/assets/dental-plane/saman-bank-logo.svg',
  //   label: 'dental_plane:saman_bank',
  //   content: <SecondTab isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />,
  // },
];
