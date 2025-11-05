import { TTabItems } from '../types';
import { FirstTab } from '../FirstTab/FirstTab';

export const getTabsItem = (
  isOpenModal: boolean,
  setIsOpenModal: (value: boolean) => void,
): TTabItems[] => [
  {
    tabImage: '/assets/dental-plane/tejarat_bank_logo.svg',
    label: 'dental_plane:tejarat_bank',
    content: (
      <FirstTab isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    ),
  },
  // {
  //   tabImage: '/assets/dental-plane/saman-bank-logo.svg',
  //   label: 'dental_plane:saman_bank',
  //   content: <SecondTab isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />,
  // },
];
