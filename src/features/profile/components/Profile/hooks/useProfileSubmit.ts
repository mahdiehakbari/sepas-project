import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '@/store/Profile/useProfileStore';
import { updateProfile } from '../api/profile.api';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';
import { IProfileFormValues } from '../types';
import { ProfileSubmitProps } from './types';

export const useProfileSubmit = ({
  name,
  setIsEditing,
  setShowProfileModal,
  setShowCreditNoteModal,
  setUser,
}: ProfileSubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { setProfile } = useProfileStore();

  const onSubmit = async (data: IProfileFormValues) => {
    const token = Cookies.get('token');
    if (!token) return toast.error(t('profile:token_missing'));

    setIsLoading(true);

    // Map gender: 'Male' -> 0, 'Female' -> 1
    const genderValue = data.gender === 'Female' ? 1 : 0;

    const formattedData: Partial<IProfileFormValues> = {
      ...data,
      gender: genderValue,
      birthDate: data.birthDate,
      FullName: `${data.firstName} ${data.lastName}`,
    };

    if (!formattedData.email) {
      delete formattedData.email;
    }

    try {
      const res = await updateProfile(token, formattedData);
      setProfile(res.data.profile);
      Cookies.set('userProfile', JSON.stringify(data));

      if (name === 'userAccount') {
        const res = await axios.get(API_AUTHENTICATE_ME, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData =
          typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setUser?.(userData);
        setIsEditing?.(false);
      }

      Cookies.set('isLoggedIn', 'true');
      toast.success(t('profile:success_toast'));

      if (name === 'profile') router.push('/panel/userAccount');

      setShowProfileModal?.(false);
      setShowCreditNoteModal?.(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      const respData = axiosError.response?.data as
        | { errors?: Record<string, string | string[]>; title?: string }
        | undefined;

      if (respData?.errors && typeof respData.errors === 'object') {
        Object.entries(respData.errors).forEach(([, msgs]) => {
          if (Array.isArray(msgs)) {
            msgs.forEach((m: string) => toast.error(`${m}`));
          } else if (typeof msgs === 'string') {
            toast.error(`${msgs}`);
          }
        });
      } else if (respData?.title) {
        toast.error(respData.title);
      } else {
        toast.error('در ارسال اطلاعات مشکلی رخ داده است.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
