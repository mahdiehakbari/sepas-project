import axios from 'axios';

import { API_UPDATE_PROFILE } from '@/config/api_address.config';

export const updateProfile = async (token: string, data: any) => {
  return axios.put(API_UPDATE_PROFILE, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
