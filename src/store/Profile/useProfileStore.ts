import { create } from 'zustand';
import { IProfileStore } from './types';

export const useProfileStore = create<IProfileStore>((set) => ({
  profile: {
    firstName: '',
    lastName: '',
    mobile: '',
    nationalId: '',
    gender: '',
    birthDate: '',
    email: '',
    iban: '',
    province: '',
    cityId: '',
    postalCode: '',
    addressDetails: '',
  },
  setProfile: (data) => set({ profile: data }),
}));
