'use client';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import { ShowUserData } from '@/features/userAccount';
import { ProfileForm } from '@/features/profile';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';

export default function UserAccount() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState<IProfileFormValues>({
    fullName: '',
    phoneNumber: '',
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
    address: {
      id: '',
      cityId: '',
      cityName: '',
      provinceId: '',
      provinceName: '',
      details: '',
      postalCode: '',
    },
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setPageLoading(false);
      return;
    }

    setPageLoading(true);
    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData =
          typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setUser(userData);
      })
      .catch(() => {})
      .finally(() => setPageLoading(false));
  }, []);

  const handleBack = () => {
    setIsEditing(false);
  };

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto'>
      {isEditing ? (
        <ProfileForm
          name='userAccount'
          handleBack={handleBack}
          setUser={setUser}
          setIsEditing={setIsEditing}
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
