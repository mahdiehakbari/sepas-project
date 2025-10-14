import { useState } from 'react';
import axios from 'axios';
import { useSendOtp } from '../useSendOtp';

interface IUsePhoneNumberSubmitProps {
  setIsOpenLoginModal: (v: boolean) => void;
  setIsOpenOtpModal: (v: boolean) => void;
}

export const usePhoneNumberSubmit = ({
  setIsOpenLoginModal,
  setIsOpenOtpModal,
}: IUsePhoneNumberSubmitProps) => {
  const { sendOtp } = useSendOtp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: { phoneNumber: string }) => {
    setLoading(true);
    setError('');

    try {
      await sendOtp({ phoneNumber: data.phoneNumber });
      setIsOpenLoginModal(false);
      setIsOpenOtpModal(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'خطا در ارسال کد تأیید');
      } else {
        setError('خطای غیرمنتظره‌ای رخ داده است');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    error,
  };
};
