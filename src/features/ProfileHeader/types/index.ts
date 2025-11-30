import { RefObject } from 'react';

export interface IProfileHeaderProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  profileImage: string;
  userProfile: {
    firstName?: string;
    lastName?: string;
  } | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
