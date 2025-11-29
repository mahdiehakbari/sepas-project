'use client';
import { API_ACCOUNT_BALANCES } from '@/config/api_address.config';
import Card from '@/sharedComponent/ui/Card/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { SpinnerDiv } from '@/sharedComponent/ui';
import { IWalletAccount } from './types';
import { ContentStateWrapper } from '@/features/layout';

const MyPlanes = () => {
  const { t } = useTranslation();
  const [myPlanData, setMyPlaneData] = useState<IWalletAccount[]>([]);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setPageLoading(false);
      return;
    }
    axios
      .get(API_ACCOUNT_BALANCES, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMyPlaneData(res.data.data);
        setPageLoading(false);
      })
      .catch(() => {});
  }, []);

  return (
    <ContentStateWrapper
      loading={pageLoading}
      // isEmpty={pageLoading && myPlanData.length === 0}
      loadingText={t('home:page_loading')}
      // emptyText={t('home:empty')}
    >
      <div className='flex items-center gap-6'>
        {myPlanData?.map((item, index) => (
          <div key={index}>
            {item.tag == 7001 && (
              <Card
                title={t('my_planes:dental_plan')}
                remaining={item.balance.toLocaleString('fa-IR')}
                borderColor='bg-blue-400'
                image='/assets/icons/tooth-health.svg'
              />
            )}
          </div>
        ))}
      </div>
    </ContentStateWrapper>
  );
};

export default MyPlanes;
