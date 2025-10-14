import axios from 'axios';
import Cookies from 'js-cookie';
import { API_SEND_OTP } from '@/config/api_address.config';

interface SendOtpParams {
  phoneNumber: string;
}

export const useSendOtp = () => {
  const sendOtp = async ({ phoneNumber }: SendOtpParams) => {
    Cookies.set('phoneNumber', phoneNumber, { path: '/' });

    const response = await axios.post(API_SEND_OTP, { phoneNumber });

    return response.data;
  };

  return { sendOtp };
};
