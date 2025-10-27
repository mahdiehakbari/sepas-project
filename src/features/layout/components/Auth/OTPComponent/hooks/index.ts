'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_AUTHENTICATE } from '@/config/api_address.config';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth/authStore';

export const useOtp = (onClose: () => void) => {
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const savedPhone = Cookies.get('phoneNumber');
    if (savedPhone) setPhone(savedPhone);
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setAuth(token, parsedUser);
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
  }, [setAuth]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await axios.post(API_AUTHENTICATE, {
        phoneNumber: phone,
        otp,
      });

      const { token, user } = response.data;

      setAuth(token, user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (!user.isVerified) {
        // router.push('/profile');
        Cookies.set('isLoggedIn', 'false');
      } else {
        Cookies.set('isLoggedIn', 'true');
        // router.push('/');
      }

      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'خطایی رخ داده است.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('خطای ناشناخته رخ داده است.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    phone,
    otp,
    setOtp,
    isSubmitting,
    error,
    handleSubmit,
    user,
  };
};
