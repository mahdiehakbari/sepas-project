export interface IPhoneNumberModalProps {
  setIsOpenLoginModal: (value: boolean) => void;
  setIsOpenOtpModal: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
}

export type TFormValues = {
  phoneNumber: string;
};
