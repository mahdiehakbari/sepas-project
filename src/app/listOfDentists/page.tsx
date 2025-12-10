'use client';
import { API_DENTIST_LIST } from '@/config/api_address.config';
import { BannerSection } from '@/features/DentistList';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const ListOfDentist = () => {
  const token = Cookies.get('token');
  useEffect(() => {
    axios
      .post(API_DENTIST_LIST, {
        pageNumber: 1,
        pageSize: 20,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <BannerSection />
    </div>
  );
};

export default ListOfDentist;
