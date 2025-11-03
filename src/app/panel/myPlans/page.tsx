'use client';
import { API_ACCOUNT_BALANCES } from '@/config/api_address.config';
import Card from '@/sharedComponent/ui/Card/Card';
import axios from 'axios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const MyPlanes = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const token = Cookies.get('token');
    axios
      .get(API_ACCOUNT_BALANCES, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {});
  }, []);

  return (
    <div className=' flex items-center'>
      <Card
        title={t('my_planes:dental_plan')}
        amountReceived='100 تومان'
        cost='80 تومان'
        remaining='20 تومان'
        borderColor='bg-blue-400'
        image='/assets/icons/tooth-health.svg'
      />
    </div>
  );
};

export default MyPlanes;
