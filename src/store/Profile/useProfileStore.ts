import { create } from 'zustand';

export interface Profile {
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

interface ProfileStore {
  profile: Profile;
  setProfile: (data: Profile) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: {
    firstName: '',
    lastName: '',
    mobile: '',
    nationalCode: '',
    gender: '',
    birthDate: '',
    email: '',
    iban: '',
    country: '',
    province: '',
    city: '',
    postalCode: '',
    address: '',
  },
  setProfile: (data) => set({ profile: data }),
}));
