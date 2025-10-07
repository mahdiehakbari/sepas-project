export interface IProfile {
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  gender: string;
  birthDate: string;
  email: string;
  iban: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface IProfileStore {
  profile: IProfile;
  setProfile: (data: IProfile) => void;
}
