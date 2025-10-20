import { create } from 'zustand';
import { IProfileStore } from './types';

export const useProfileStore = create<IProfileStore>((set) => ({
  profile: {
    firstName: '',
    lastName: '',
    mobile: '',
    nationalCode: '',
    gender: '',
    birthDate: '',
    email: '',
    iban: '',
    province: '',
    city: '',
    postalCode: '',
    address: '',
  },
  setProfile: (data) => set({ profile: data }),
}));
