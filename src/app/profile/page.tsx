'use client';

import { ProfileForm } from '@/features/profile';
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className='p-4'>
      <ProfileForm name='profile' handleBack={handleBack} />
    </div>
  );
}
