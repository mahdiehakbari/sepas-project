'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/sharedComponent/ui';
import { getNavItems } from './constants';
import { MobileMenu } from './MobileMenu';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { PhoneNumberModal } from '../Auth/PhoneNumber/PhoneNumberModal';
import { OtpModal } from '../Auth/OTPComponent/OtpModal';
import { useAuthStore } from '@/store/Auth/authStore';
import { IUserData } from './types';
import axios from 'axios';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';

const PROFILE_IMAGE_BASE_URL =
  'https://dentalitfiles.sepasholding.com/images/profileimages/';

export const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenOtpModal, setIsOpenOtpModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const token = Cookies.get('token');
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const isLoggedIn = Cookies.get('isLoggedIn');
  const isActive = (path: string) => pathname === path;

  const resolveProfileImage = (user: IUserData | null) => {
    const savedProfileImage = localStorage.getItem('profileImage');

    if (savedProfileImage) {
      return PROFILE_IMAGE_BASE_URL + savedProfileImage;
    }

    switch (user?.gender) {
      case 'Male':
        return '/assets/icons/avatar-m.jpg';
      case 'Female':
        return '/assets/icons/avatar-f.jpg';
      default:
        return '/assets/icons/guest.jpg';
    }
  };

  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    setIsOpenLoginModal(false);
    router.push('/');
  };

  const handleLogin = () => {
    setIsOpenLoginModal(true);
    setIsOpenOtpModal(false);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setUserData(null);
      setProfileImage('/assets/icons/guest.jpg');
      return;
    }

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    setUserData(user);
    setProfileImage(resolveProfileImage(user));
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfileImage(PROFILE_IMAGE_BASE_URL + res.data.imageFilePath);
        localStorage.setItem('profileImage', res.data.imageFilePath);
      })
      .catch((err) => console.error(err));

    const handleProfileImageUpdated = () => {
      const savedProfileImage = localStorage.getItem('profileImage');
      if (savedProfileImage) {
        setProfileImage(PROFILE_IMAGE_BASE_URL + savedProfileImage);
      }
    };

    window.addEventListener('profileImageUpdated', handleProfileImageUpdated);

    return () => {
      window.removeEventListener(
        'profileImageUpdated',
        handleProfileImageUpdated,
      );
    };
  }, [isLoggedIn, token]);

  return (
    <header className='w-full sticky top-0 z-50 shadow bg-white mb-14'>
      <div className='mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between'>
        <div className='flex items-center gap-12'>
          <Image
            src='/assets/icons/logo.png'
            alt='logo'
            width={78}
            height={42}
          />

          <nav className='hidden md:flex items-center gap-6 text-sm'>
            {getNavItems().map((item) => (
              <Link key={item.id} href={item.href}>
                <p
                  className={`font-medium hover:text-primary ${
                    isActive(item.href) ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-3'>
          {!isLoggedIn ? (
            <Button onClick={handleLogin}>{t('home:login')}</Button>
          ) : (
            <div className='relative' ref={menuRef}>
              <div
                onClick={() => setOpenPopUp(true)}
                className='cursor-pointer'
              >
                <img
                  src={profileImage || '/assets/icons/guest.jpg'}
                  alt='user-profile-icon'
                  className='w-14 h-14 rounded-full object-cover'
                  onError={(e) => {
                    e.currentTarget.src = '/assets/icons/guest.jpg';
                  }}
                />
              </div>
              {openPopUp && (
                <DropdownMenu
                  isOpen={openPopUp}
                  onClose={() => setOpenPopUp(false)}
                  items={[
                    ...(isLoggedIn == 'true'
                      ? [
                          {
                            label: t('profile:user_account'),
                            href: '/panel/userAccount',
                            image: '/assets/icons/user-account.svg',
                          },
                        ]
                      : [
                          {
                            label: t('profile:complete_profile'),
                            href: '/profile',
                            image: '/assets/icons/user-account.svg',
                          },
                        ]),
                    ...(isLoggedIn == 'true'
                      ? [
                          {
                            label: t('profile:requests_list'),
                            href: '/panel/requestList',
                            image: '/assets/icons/document.svg',
                          },
                          {
                            label: t('profile:transactions_list'),
                            href: '/panel/transactionList',
                            image: '/assets/icons/document.svg',
                          },
                          {
                            label: t('profile:my_plans'),
                            href: '/panel/myPlans',
                            image: '/assets/icons/document.svg',
                          },
                        ]
                      : []),
                    {
                      label: t('profile:log_out'),
                      image: '/assets/icons/logout.svg',
                      danger: true,
                      onClick: handleLogout,
                    },
                  ]}
                />
              )}
            </div>
          )}

          <button
            className='md:hidden w-8 h-8'
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      <ResponsiveModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        {isOpenLoginModal && (
          <PhoneNumberModal
            setIsOpenLoginModal={setIsOpenLoginModal}
            setIsOpenOtpModal={setIsOpenOtpModal}
            setIsOpenModal={setIsOpenModal}
          />
        )}
        {isOpenOtpModal && (
          <OtpModal
            name='auth'
            setIsOpenOtpModal={setIsOpenOtpModal}
            setIsOpenLoginModal={setIsOpenLoginModal}
            setIsOpenModal={setIsOpenModal}
          />
        )}
      </ResponsiveModal>
    </header>
  );
};
