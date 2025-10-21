'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';

export const SideMenu = () => {
  const [userProfile, setUserProfile] = useState<IProfileFormValues | null>(
    null,
  );
  const pathname = usePathname(); // مسیر فعلی
  const router = useRouter();

  useEffect(() => {
    const userInfo = Cookies.get('userProfile');
    if (userInfo) {
      setUserProfile(JSON.parse(userInfo));
    }
  }, []);

  const menuItems = [
    {
      label: 'حساب کاربری',
      path: '/panel/userAccount',
      icon: '/assets/icons/',
    },
    {
      label: 'لیست درخواست‌ها',
      path: '/panel/requests',
      icon: '/assets/icons/',
    },
    {
      label: 'لیست تراکنش‌ها',
      path: '/panel/transactions',
      icon: '/assets/icons/',
    },
    { label: 'طرح های من', path: '/panel/plans', icon: '/assets/icons/' },
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
            className='rounded-full'
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
              className={`px-4 pb-[12px] cursor-pointer hover:text-primary ${
                isActive(item.path)
                  ? 'text-white bg-primary mb-2 mx-2 font-semibold hover:text-white rounded-2xl'
                  : ''
              }`}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div>
          <p>ارتباط با کارشناسان</p>
          <p>خروج</p>
        </div>
      </div>
    </aside>
  );
};
