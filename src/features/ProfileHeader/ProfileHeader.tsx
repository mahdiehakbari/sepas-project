'use client';
import Image from 'next/image';
import { IProfileHeaderProps } from './types';

export const ProfileHeader = ({
  fileInputRef,
  profileImage,
  userProfile,
  handleFileChange,
}: IProfileHeaderProps) => {
  return (
     <div
      className='flex items-center space-x-3 mb-8 cursor-pointer'
      onClick={() => fileInputRef.current?.click()}
    >
      <div className='relative'>
        <div className='w-14 h-14 rounded-full overflow-hidden relative'>
          <Image
            src={profileImage || '/assets/icons/guest.jpg'}
            alt='user'
            fill
            className='object-cover'
          />
        </div>
        <Image
          src='/assets/icons/profile-edit-button.svg'
          alt='edit'
          width={28}
          height={28}
          className='cursor-pointer absolute top-8 left-8'
        />
      </div>

      <h2 className='font-medium text-[#515151] text-[12px] font[700]'>
        {userProfile?.firstName} {userProfile?.lastName}
      </h2>

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />
    </div>
  );
};
