'use client';
import { Button } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { ShowUserData } from '@/features/userAccount';
import { ProfileForm } from '@/features/profile';
import { useTranslation } from 'react-i18next';

export default function UserAccount() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const userAccount = Cookies.get('userAccount');
  const [user, setUser] = useState<IProfileFormValues>({
    firstName: '',
    lastName: '',
    mobile: '',
    nationalId: '',
    birthDate: '',
    gender: '',
    email: undefined,
    iban: undefined,
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

  const handleBack = () => {
    setIsEditing(false);
  };

  console.log(isEditing, userAccount);
  return (
    <div className='max-w-4xl mx-auto'>
      {isEditing ? (
        <ProfileForm
          name='userAccount'
          handleBack={handleBack}
          onSuccess={(updatedUser) => {
            setUser(updatedUser);
            setIsEditing(false);
          }}
        />
      ) : (
        <>
          <ShowUserData user={user} />
          <div className='flex justify-end my-2'>
            <Button onClick={() => setIsEditing(true)}>
              {t('profile:edit')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
