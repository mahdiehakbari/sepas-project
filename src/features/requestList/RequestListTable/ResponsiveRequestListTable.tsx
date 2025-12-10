import { IRequestListTableProps } from './types';
import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';
import { toPersianNumber } from './utils/PersianNumbr';
import { Button } from '@/sharedComponent/ui';

export const ResponsiveRequestListTable = ({
  requests,
  handleDetailCredit,
}: IRequestListTableProps) => {
  const { t } = useTranslation();
  const { getStatusInfo } = useStatusInfo();

  return (
    <div className='max-w-md mx-auto mt-10'>
      {requests?.map((req, index) => {
        const { label, className } = getStatusInfo(req.status);
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('request_list:plane_name')}
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {t('request_list:dentistry')}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('request_list:request_date')}
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {new Date(req.createdAt).toLocaleDateString('fa-IR')}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('request_list:request_amount')}:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {req.requestedAmount.toLocaleString('fa-IR')}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('request_list:tracking_number')}:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {toPersianNumber(req.referenceNumber)}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('request_list:status_title')}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                  >
                    {label}
                  </span>
                </div>
                {req.status === 9 && (
                  <Button
                    onClick={() => handleDetailCredit(req.id)}
                    className='w-full'
                  >
                    {t('credit:detail')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
