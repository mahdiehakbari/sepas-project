'use client';
import { getThItems } from './constants';
import { useTranslation } from 'react-i18next';
import { IRequestListTableProps } from './types';
import { useStatusInfo } from './utils/useStatusInfo';
import { Button } from '@/sharedComponent/ui';
import { useRouter } from 'next/navigation';
import { toPersianNumber } from './utils/PersianNumbr';

export const RequestListTable = ({
  requests,
  currentPage,
  pageSize,
}: IRequestListTableProps) => {
  const { t } = useTranslation();
  const { getStatusInfo } = useStatusInfo();
  const router = useRouter();

  const handlePayment = (id: string) => {
    router.push(`/services/dentalPlan?requestId=${id}&&type=1`);
    localStorage.setItem('payment', 'true');
  };

  const handlePaymentCredit = (id: string) => {
    router.push(`/services/dentalPlan?requestId=${id}&&type=2`);
    localStorage.setItem('payment', 'true');
  };

  const headers = getThItems();

  return (
    <div className='w-full'>
      <div className='hidden md:flex bg-gray-100 rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm mb-2'>
        {headers.map((item) => (
          <div key={item.id} className='w-1/5 text-right'>
            {item.label}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-3'>
        {requests?.map((req, index) => {
          const { label, className } = getStatusInfo(Number(req.status));

          return (
            <div
              key={req.id}
              className='flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-3'
            >
              <div className='w-full md:w-[5%] text-center mb-1 md:mb-0'>
                {index + 1 + (currentPage - 1) * pageSize}
              </div>
              <div className='w-full md:w-[20%] text-center mb-1 md:mb-0'>
                {t('request_list:dentistry')}
              </div>
              <div className='w-full md:w-[20%] text-center mb-1 md:mb-0'>
                {new Date(req.createdAt).toLocaleTimeString('fa-IR') +
                  ' - ' +
                  new Date(req.createdAt).toLocaleDateString('fa-IR')}
              </div>
              <div className='w-full md:w-[20%] text-center mb-1 md:mb-0'>
                {req.requestedAmount.toLocaleString('fa-IR')}
              </div>
              <div className='w-full md:w-[20%] text-center mb-1 md:mb-0'>
                {toPersianNumber(req.referenceNumber)}
              </div>
              <div className='w-full md:w-[20%] text-center mb-1 md:mb-0'>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                >
                  {label}
                </span>
              </div>
              <div className='w-full md:w-[20%] text-center flex justify-center gap-2'>
                {(req.status === 3 || req.status === 5) && (
                  <Button onClick={() => handlePayment(req.id)}>
                    {t('request_list:payment')}
                  </Button>
                )}
                {(req.status === 4 || req.status === 6 || req.status === 7) && (
                  <Button onClick={() => handlePaymentCredit(req.id)}>
                    {t('credit:receive_credit')}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
