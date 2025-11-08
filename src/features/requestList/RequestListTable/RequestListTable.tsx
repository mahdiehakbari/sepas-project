'use client';
import { getThItems } from './constants';
import { useTranslation } from 'react-i18next';
import { IRequestListTableProps } from './types';
import { useStatusInfo } from './utils/useStatusInfo';
import { Button } from '@/sharedComponent/ui';
import { useRouter } from 'next/navigation';

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

  console.log(requests, 'aaaa');

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate [border-spacing:0_16px]'>
        <thead>
          <tr>
            <th colSpan={5} className='p-0'>
              <div className='flex bg-[var(--block-color)] border border-[var(--border-color)] rounded-[8px] px-3 py-3 font-semibold text-gray-700 text-sm'>
                {getThItems().map((item) => (
                  <div key={item.id} className='w-1/5 text-right'>
                    {item.label}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req, index) => {
            const { label, className } = getStatusInfo(Number(req.status));

            return (
              <tr key={req.id}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-[var(--border-color)] rounded-[8px] px-3 py-3'>
                    <div className='w-[5%] text-center'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    <div className='w-[20%] text-center'>
                      {t('request_list:dentistry')}
                    </div>
                    <div className='w-[20%] text-center'>
                      {new Date(req.createdAt).toLocaleTimeString('fa-IR') +
                        ' - ' +
                        new Date(req.createdAt).toLocaleDateString('fa-IR')}
                    </div>
                    <div className='w-[20%] text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                      >
                        {label}
                      </span>
                    </div>
                    <div className='w-[20%] text-center'>
                      {(req.status == 3 || req.status == 5) && (
                        <Button onClick={() => handlePayment(req.id)}>
                          {t('request_list:payment')}
                        </Button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
