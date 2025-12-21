import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AxiosError, AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { uploadProfileImage } from '../api/profileImage.api';

interface UploadProfileImageResponse {
  message?: string;
  success?: boolean;
  imageFilePath?: string | null;
  assetId?: string | null;
}

export const useUploadProfileImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const uploadImage = async (
    base64Image: string,
    description?: string,
  ): Promise<string | null> => {
    // برگرداندن imageFilePath یا null
    const token = Cookies.get('token');

    if (!token) {
      toast.error(t('profile:token_missing'));
      return null;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<UploadProfileImageResponse> =
        await uploadProfileImage(token, {
          base64Image,
          description: description || 'User profile picture',
        });

      console.log('Upload profile image response:', response);

      if (response.data?.success && response.data.imageFilePath) {
        toast.success(t('profile:success_toast'));
        return response.data.imageFilePath;
      } else {
        toast.error(response.data?.message || t('profile:update_error'));
        return null;
      }
    } catch (error) {
      const axiosError = error as AxiosError<UploadProfileImageResponse>;

      toast.error(
        axiosError.response?.data?.message || t('profile:update_error'),
      );

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
  };
};
