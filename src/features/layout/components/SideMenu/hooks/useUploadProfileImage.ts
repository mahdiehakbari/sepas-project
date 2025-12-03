import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { uploadProfileImage } from '../api/profileImage.api';

export const useUploadProfileImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const uploadImage = async (base64Image: string, description?: string) => {
    const token = Cookies.get('token');
    if (!token) {
      toast.error(t('profile:token_missing'));
      return false;
    }

    setIsLoading(true);

    try {
      await uploadProfileImage(token, {
        base64Image,
        description: description || 'User profile picture',
      });
      toast.success(t('profile:success_toast'));
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || t('profile:update_error'),
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading };
};
