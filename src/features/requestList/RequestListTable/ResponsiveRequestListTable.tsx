import { Button } from '@/sharedComponent/ui';
import { IRequestListTableProps } from './types';
import { useTranslation } from 'react-i18next';
// import { getStatusColor } from './utils/useStatusInfo';

export const ResponsiveRequestListTable = ({
  requests,
  currentPage,
  pageSize,
}: IRequestListTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='max-w-md mx-auto mt-10'>
      {requests.map((req, index) => (
        <div key={index}>
          <div className='border-2 border-[var(--border-color)] rounded-lg mb-4'>
            <div className=' p-4 '>
              <div className='flex justify-between items-center mb-2 '>
                <h2 className='font-semibold text-gray-800'>
                  {t('request_list:dentistry')}
                </h2>
                {/* <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    req.status,
                  )}`}
                >
                  {req.status}
                </span> */}
              </div>
              <p className='text-gray-600 mb-4'>
                {new Date(req.createdAt).toLocaleDateString('fa-IR')}
              </p>
            </div>
            {/* {req.status === 'تایید شده' && (
              <div className='border-t border-[var(--border-color)]  p-4'>
                <Button className='w-full  p-4 '>پرداخت آبو‌مان</Button>
              </div>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
};
