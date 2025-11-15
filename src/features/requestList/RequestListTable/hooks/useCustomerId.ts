import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';

export const useCustomerId = (onDone?: () => void) => {
  const [customerId, setCustomerId] = useState<string>('');
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      onDone?.();
      return;
    }

    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCustomerId(res.data.customerId))
      .catch((err) => console.error(err))
      .finally(() => onDone?.());
  }, [token]);

  return { customerId };
};
