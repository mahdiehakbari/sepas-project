'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { useTranslation } from 'react-i18next';
import { getSideBarItems } from './constants';
import { useAuthStore } from '@/store/Auth/authStore';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { Button } from '@/sharedComponent/ui';
import { ProfileHeader } from '@/features/ProfileHeader';
import { IUserData } from '../Header/types';
import { useUploadProfileImage } from './hooks/useUploadProfileImage';

export const SideMenu = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadImage, isLoading } = useUploadProfileImage();

  const [userProfile, setUserProfile] = useState<IProfileFormValues | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [supportModal, setSupportModal] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  useEffect(() => {
    const userInfo = localStorage.getItem('userProfile');
    if (userInfo) {
      Promise.resolve().then(() => setUserProfile(JSON.parse(userInfo)));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const blobUrl = URL.createObjectURL(file);
    setPreviewImage(blobUrl);
    setIsModalOpen(true);
    setSupportModal(false);
    e.target.value = '';
  };

  const handleConfirmImage = async () => {
    if (!previewImage) return;

    try {
      // Convert blob URL to base64
      const response = await fetch(previewImage);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Remove the data:image/...;base64, prefix
        const base64Image = base64String.split(',')[1];

        // Upload to backend
        const success = await uploadImage(base64Image);

        if (success) {
          // Store the full base64 string (with prefix) in localStorage
          localStorage.setItem('profileImage', base64String);
          // Only set the profile image if upload was successful
          setProfileImage(base64String);

          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('profileImageUpdated'));
        }

        setPreviewImage(null);
        setIsModalOpen(false);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting image:', error);
      setPreviewImage(null);
      setIsModalOpen(false);
    }
  };

  const handleCancelImage = () => {
    setPreviewImage(null);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    localStorage.removeItem('profileImage');
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;
  const isLoggedIn = Cookies.get('isLoggedIn');

  useEffect(() => {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    } else {
      setUserData(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    } else {
      switch (userData?.gender) {
        case 'Male':
          setProfileImage('/assets/icons/avatar-m.jpg');
          break;
        case 'Female':
          setProfileImage('/assets/icons/avatar-f.jpg');
          break;
        default:
          setProfileImage('/assets/icons/guest.jpg');
          break;
      }
    }
  }, [userData]);

  const handleSupport = () => {
    setIsModalOpen(true);
    setSupportModal(true);
  };

  return (
    <>
      <aside className='w-64 bg-[#F8F9FA] shadow-md p-6'>
        <ProfileHeader
          fileInputRef={fileInputRef}
          profileImage={profileImage}
          userProfile={userProfile}
          handleFileChange={handleFileChange}
        />
        <div className='bg-white h-[65vh] flex flex-col justify-between py-6'>
          <ul className='font[400] text-[16px]'>
            {getSideBarItems().map((item) => (
              <li
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-4 py-2 cursor-pointer flex items-center mb-2 mx-2
        ${
          isActive(item.path)
            ? 'text-white bg-primary font-semibold rounded-2xl'
            : ''
        }
        ${'hover:text-primary'}
      `}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <span
                  className={`pr-1 ${isActive(item.path) ? 'text-white' : ''}`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className='px-6'>
            <div
              className='flex items-center gap-2 pb-4  cursor-pointer '
              onClick={handleSupport}
            >
              <Image
                src='/assets/icons/headphone.svg'
                alt=''
                width={20}
                height={20}
              />
              <p className='text-black font-normal text-[16px] leading-6 hover:text-primary'>
                {t('profile:communication_experts')}
              </p>
            </div>
            <div
              className='flex items-center gap-1 pb-1 cursor-pointer '
              onClick={handleLogout}
            >
              <Image
                src='/assets/icons/logout.svg'
                alt='logout'
                width={20}
                height={20}
              />
              <p className='text-[#FF4B4B] font-normal text-[16px] leading-6 '>
                {t('profile:log_out')}
              </p>
            </div>
          </div>
        </div>
      </aside>
      <ResponsiveModal
        title={
          supportModal == false
            ? t('home:select_image')
            : t('profile:communication_experts')
        }
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSupportModal(false);
        }}
      >
        {supportModal == false ? (
          <div className='md:w-[600px]'>
            <img
              src={previewImage!}
              alt='preview'
              className='w-40 h-40 object-cover rounded-full mx-auto my-6'
            />

            <div className='flex justify-between p-4 border-t border-border-color '>
              <Button variant='outline' onClick={handleCancelImage}>
                {t('home:cancel')}
              </Button>
              <Button onClick={handleConfirmImage} disabled={isLoading}>
                {isLoading
                  ? t('home:uploading') || 'در حال آپلود...'
                  : t('home:confirm')}
              </Button>
            </div>
          </div>
        ) : (
          <div className='md:w-[500px] py-8 px-6'>
            <div className='flex items-center gap-2'>
              <p>شماره تماس پشتیبانی:</p>
              <p>۰۲۱-۷۹۵۷۲۰۰۰</p>
            </div>
          </div>
        )}
      </ResponsiveModal>
    </>
  );
};
