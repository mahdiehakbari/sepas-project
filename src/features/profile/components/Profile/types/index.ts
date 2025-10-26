export interface IProfileFormValues {
  firstName: string;
  lastName: string;
  mobile: string;
  nationalId: string;
  birthDate: string;
  gender: string;
  email?: string;
  iban?: string;
  province: string;
  cityId: string;
  postalCode: string;
  addressDetails: string;
  FullName: string;
}

export interface IProfileFormProps {
  name: string;
  handleBack: () => void;
  onSuccess?: (updatedUser: IProfileFormValues) => void;
  setShowProfileModal?: ((value: boolean) => void) | null;
  setShowCreditNoteModal?: (value: boolean) => void;
}
