export interface IUploadProfileImageData {
  base64Image: string;
  description?: string;
}

export interface IProfileImageResponse {
  id: string;
  userId: string;
  imageUrl: string;
  base64Image: string;
  description: string;
  createdAt: string;
}
