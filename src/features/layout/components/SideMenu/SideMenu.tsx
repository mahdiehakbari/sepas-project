'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { useTranslation } from 'react-i18next';

export const SideMenu = () => {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<IProfileFormValues | null>(
    null,
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userInfo = Cookies.get('userProfile');
    if (userInfo) {
      setUserProfile(JSON.parse(userInfo));
    }
  }, []);

  const menuItems = [
    {
      label: t('profile:user_account'),
      path: '/panel/userAccount',
      icon: '/assets/icons/white-user-acc.svg',
    },
    {
      label: t('profile:requests_list'),
      path: '/panel/requests',
      icon: '/assets/icons/document.svg',
    },
    {
      label: t('profile:transactions_list'),
      path: '/panel/transactions',
      icon: '/assets/icons/transaction-list.svg',
    },
    {
      label: t('profile:my_plans'),
      path: '/panel/plans',
      icon: '/assets/icons/my-plans.svg',
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className='w-64 bg-[#F8F9FA] shadow-md p-6'>
      <div className='flex items-center space-x-3 mb-8'>
        <div className='relative'>
          <Image
            src='/assets/icons/user-profile-icon.jpg'
            alt='user'
            width={56}
            height={56}
            className='rounded-full text-white'
          />
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
      </div>
      <div className='bg-white h-[100vh] flex flex-col justify-between py-6'>
        <ul className=' font[400] text-[16px]'>
          {menuItems.map((item) => (
            <li
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`px-4 py-2 cursor-pointer hover:text-primary flex items-center ${
                isActive(item.path)
                  ? 'text-white bg-primary mb-2 mx-2 font-semibold hover:text-white rounded-2xl'
                  : ''
              }`}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span
                className={` pr-1${isActive(item.path) ? 'text-white' : ''}`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className='px-6'>
          <div className='flex items-center gap-2 pb-4'>
            <Image
              src='/assets/icons/headphone.svg'
              alt=''
              width={20}
              height={20}
            />
            <p className='text-black font-[400] text-[16px] leading-6'>
              {t('profile:communication_experts')}
            </p>
          </div>
          <div className='flex items-center gap-1 pb-1'>
            <Image
              src='/assets/icons/logout.svg'
              alt=''
              width={20}
              height={20}
            />
            <p className='text-[#FF4B4B] font-[400] text-[16px] leading-6'>
              {t('profile:log_out')}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
