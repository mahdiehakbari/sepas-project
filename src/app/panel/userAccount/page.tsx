'use client';
import { Button } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { ShowUserData } from '@/features/userAccount';
import { ProfileForm } from '@/features/profile';

export default function UserAccount() {
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <>
        {isEditing ? (
          <ProfileForm name='userAccount' />
        ) : (
          <>
            <ShowUserData user={user} />
            <div className='flex justify-end mt-2'>
              <Button onClick={handleEditClick}>ویرایش اطلاعات</Button>
            </div>
          </>
        )}
      </>
    </>
  );
}
