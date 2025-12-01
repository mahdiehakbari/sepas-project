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

export const SideMenu = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [userProfile, setUserProfile] = useState<IProfileFormValues | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState<string>(
    '/assets/icons/guest.jpg',
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
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
    e.target.value = '';
  };

  const handleConfirmImage = () => {
    if (previewImage) {
      setProfileImage(previewImage);
    }
    setPreviewImage(null);
    setIsModalOpen(false);
  };

  const handleCancelImage = () => {
    setPreviewImage(null);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

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
            <div className='flex items-center gap-2 pb-4  cursor-pointer '>
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
        title={t('home:select_image')}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
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
            <Button onClick={handleConfirmImage}>{t('home:confirm')}</Button>
          </div>
        </div>
      </ResponsiveModal>
    </>
  );
};
