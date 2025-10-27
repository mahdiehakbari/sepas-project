interface IAddress {
  id: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  details: string;
  postalCode: string;
}

export interface IProfileFormValues {
  phoneNumber?: string;
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
  FullName?: string;
  address?: IAddress;
}

export interface IProfileFormProps {
  setUser?: (value: IProfileFormValues) => void;
  name: string;
  handleBack: () => void;
  onSuccess?: (updatedUser: IProfileFormValues) => void;
  setShowProfileModal?: ((value: boolean) => void) | null;
  setShowCreditNoteModal?: (value: boolean) => void;
  setIsEditing?: (value: boolean) => void;
}
