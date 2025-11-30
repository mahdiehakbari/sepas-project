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
  const [myPlanData, setMyPlaneData] = useState<IWalletAccount | null>(null);

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
        console.log(res.data, 'aaaa');
        setMyPlaneData(res.data);
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
        <Card
          title={t('my_planes:dental_plan')}
          remaining={myPlanData?.totalAmountDeduction.toLocaleString('fa-IR')}
          amountReceived={myPlanData?.totalAmountSuccessfulPurchaseRequests.toLocaleString(
            'fa-IR',
          )}
          cost={myPlanData?.totalAmountSuccessfulCustomerCreditRequests.toLocaleString(
            'fa-IR',
          )}
          borderColor='bg-blue-400'
          image='/assets/icons/tooth-health.svg'
        />
      </div>
    </ContentStateWrapper>
  );
};

export default MyPlanes;
