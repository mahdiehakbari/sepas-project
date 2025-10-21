'use client';
import { Button, FormTitle } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { ShowUserData } from '@/features/userAccount';

export default function UserAccount() {
  const { t } = useTranslation();
  const [user, setUser] = useState<IProfileFormValues>({
    firstName: '',
    lastName: '',
    mobile: '',
    nationalId: '',
    birthDate: '',
    gender: '',
    email: '',
    iban: '',
    province: '',
    cityId: '',
    postalCode: '',
    addressDetails: '',
  });

  useEffect(() => {
    const userProfileString = Cookies.get('userProfile');
    if (userProfileString) {
      try {
        const userData = JSON.parse(userProfileString);
        setUser(userData);
      } catch (error) {
        console.error('خطا در خواندن کوکی userProfile:', error);
      }
    }
  }, []);

  return (
    <>
      <ShowUserData user={user} />
      <div className=' flex justify-end mt-2'>
        <Button>ویرایش اطلاعات</Button>
      </div>
    </>
  );
}
