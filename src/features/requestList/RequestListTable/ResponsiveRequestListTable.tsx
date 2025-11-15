import { IRequestListTableProps } from './types';
import { useTranslation } from 'react-i18next';
import { useStatusInfo } from './utils/useStatusInfo';

export const ResponsiveRequestListTable = ({
  requests,
}: IRequestListTableProps) => {
  const { t } = useTranslation();
  const { getStatusInfo } = useStatusInfo();

  return (
    <div className='max-w-md mx-auto mt-10'>
      {requests.map((req, index) => {
        const { label, className } = getStatusInfo(req.status);
        return (
          <div key={index}>
            <div className='border-2 border-border-color rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    نام طرح:
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {t('request_list:dentistry')}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    تاریخ درخواست:
                  </h2>
                  <p className='font-medium text-black text-[14px]'>
                    {new Date(req.createdAt).toLocaleDateString('fa-IR')}
                  </p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    وضعیت:
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
