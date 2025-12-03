import axios from 'axios';

import { API_UPLOAD_PROFILE_IMAGE, API_GET_PROFILE_IMAGE } from '@/config/api_address.config';

interface IUploadProfileImageData {
  base64Image: string;
  description?: string;
}

interface IProfileImageResponse {
  id: string;
  userId: string;
  imageUrl: string;
  base64Image: string;
  description: string;
  createdAt: string;
}

export const uploadProfileImage = async (
  token: string,
  data: IUploadProfileImageData,
) => {
  return axios.post(API_UPLOAD_PROFILE_IMAGE, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getProfileImage = async (
  token: string,
): Promise<IProfileImageResponse | null> => {
  try {
    const response = await axios.get<IProfileImageResponse>(API_GET_PROFILE_IMAGE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // If no image exists, return null
    return null;
  }
};
