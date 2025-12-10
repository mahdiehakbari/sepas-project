'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useToggleLanguage } from './hooks';
import { Button } from '@/sharedComponent/ui';
import { getNavItems } from './constants';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { PhoneNumberModal } from '../Auth/PhoneNumber/PhoneNumberModal';
import { OtpModal } from '../Auth/OTPComponent/OtpModal';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import ResponsiveModal from '@/sharedComponent/ui/ResponsiveModal/Modal';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { useAuthStore } from '@/store/Auth/authStore';
import { IUserData } from './types';

export const Header = () => {
  const { t } = useTranslation();
  const { toggleLanguage, currentLanguage } = useToggleLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenOtpModal, setIsOpenOtpModal] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const handleLogout = () => {
    logout();
    Cookies.remove('userProfile');
    Cookies.remove('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    router.push('/');
    setIsOpenOtpModal(false);
  };
  const handleLogin = () => {
    setIsOpenLoginModal(true);
    setIsOpenModal(true);
  };

  const isLoggedIn = Cookies.get('isLoggedIn');

  const handleClick = () => {
    setOpenPopUp(true);
  };

  useEffect(() => {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    } else {
      setUserData(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // First, try to load the profile image from localStorage
    const savedProfileImage = localStorage.getItem('profileImage');

    if (savedProfileImage) {
      // If user has uploaded a profile image, use it
      setProfileImage(savedProfileImage);
    } else {
      // Otherwise, set default avatar based on gender
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

  // Listen for profile image changes
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      const savedProfileImage = localStorage.getItem('profileImage');
      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }
    };

    window.addEventListener(
      'profileImageUpdated',
      handleStorageChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'profileImageUpdated',
        handleStorageChange as EventListener,
      );
    };
  }, []);

  return (
    <header className='w-full sticky top-0 z-50 shadow-[0px_-3px_10px_-4px_#32323214,0px_4px_6px_-2px_#32323208] bg-white mb-14'>
      <div className='mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between'>
        <div className='flex items-center gap-[50px]'>
          <Image
            src='/assets/icons/sepas.png'
            alt='logo'
            width={78}
            height={42}
            className='cursor-pointer hover:opacity-80'
          />

          <nav className='hidden md:flex items-center gap-6 text-sm'>
            {getNavItems().map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='flex items-center duration-300 no-underline'
              >
                <p
                  className={`font-medium hover:text-primary transition-all duration-300   ${
                    isActive(item.href) ? 'text-primary ' : ''
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
              <div onClick={handleClick} className='cursor-pointer'>
                <Image
                  src={profileImage || '/assets/icons/guest.jpg'}
                  alt='user-profile-icon'
                  width={56}
                  height={56}
                  className='rounded-full object-cover'
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

          {/* <button
            className='cursor-pointer bg-secondary h-[42px] px-3 py-1 rounded-[8px] flex items-center gap-2'
            onClick={toggleLanguage}
          >
            <Image
              src={
                currentLanguage === 'fa'
                  ? '/assets/icons/ir-logo.svg'
                  : '/assets/icons/us-logo.png'
              }
              alt={currentLanguage === 'fa' ? 'Iran flag' : 'US flag'}
              width={20}
              height={20}
            />
            <span className='text-sm font-medium'>
              {currentLanguage === 'fa' ? 'فا' : 'EN'}
            </span>
          </button> */}
          <button
            className='md:hidden flex flex-col justify-center items-center w-8 h-8 relative'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-transform ${
                isOpen ? 'rotate-50 translate-y-3' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-opacity ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-transform ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
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
