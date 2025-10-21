'use client';
import { useState } from 'react';

export default function UserAccount() {
  const [user, setUser] = useState({
    firstName: 'سعید',
    lastName: 'لطفی',
    mobile: '09112345678',
    code: '031098766',
    birthDate: '1370/09/27',
    gender: 'مرد',
    email: '',
    bankNumber: '',
    province: 'تهران',
    city: 'تهران',
    postalCode: '213434213',
    address: 'شهرک غرب خیابان محمدرضا شجریان خیابان سوم پلاک سه',
  });

  return (
    <>
      <h1 className='text-2xl font-bold mb-6'>اطلاعات فردی</h1>
      <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-gray-500'>نام:</p>
            <p className='font-medium'>{user.firstName}</p>
          </div>
          <div>
            <p className='text-gray-500'>نام خانوادگی:</p>
            <p className='font-medium'>{user.lastName}</p>
          </div>
          <div>
            <p className='text-gray-500'>شماره موبایل:</p>
            <p className='font-medium'>{user.mobile}</p>
          </div>
          <div>
            <p className='text-gray-500'>کد ملی:</p>
            <p className='font-medium'>{user.code}</p>
          </div>
          <div>
            <p className='text-gray-500'>تاریخ تولد:</p>
            <p className='font-medium'>{user.birthDate}</p>
          </div>
          <div>
            <p className='text-gray-500'>جنسیت:</p>
            <p className='font-medium'>{user.gender}</p>
          </div>
          <div>
            <p className='text-gray-500'>ایمیل:</p>
            <p className='font-medium'>{user.email || '-'}</p>
          </div>
        </div>

        <h2 className='text-xl font-semibold mt-6'>اطلاعات آدرس</h2>
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div>
            <p className='text-gray-500'>استان:</p>
            <p className='font-medium'>{user.province}</p>
          </div>
          <div>
            <p className='text-gray-500'>شهر:</p>
            <p className='font-medium'>{user.city}</p>
          </div>
          <div>
            <p className='text-gray-500'>کدپستی:</p>
            <p className='font-medium'>{user.postalCode}</p>
          </div>
          <div className='col-span-2'>
            <p className='text-gray-500'>آدرس:</p>
            <p className='font-medium'>{user.address}</p>
          </div>
        </div>

        <button className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          ویرایش اطلاعات
        </button>
      </div>
    </>
  );
}
