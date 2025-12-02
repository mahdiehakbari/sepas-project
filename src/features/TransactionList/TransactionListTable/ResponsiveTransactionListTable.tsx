import { ITransactionListTableProps } from './types';
import { useTranslation } from 'react-i18next';
import { useStatus } from './utils/useStatus';
import { toPersianNumber } from '@/features/requestList/RequestListTable/utils/PersianNumbr';

export const ResponsiveTransactionListTable = ({
  transactions,
  currentPage,
  pageSize,
}: ITransactionListTableProps) => {
  const { t } = useTranslation();
  const { getStatus } = useStatus();

  return (
    <div className='max-w-md mx-auto mt-10'>
      {transactions.map((transaction, index) => {
        const { label, className } = getStatus(transaction.status);
        return (
          <div key={index}>
            <div className='border-2 border-[var(--border-color)] rounded-lg mb-4'>
              <div className=' p-4 '>
                <div className='flex gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    نام طرح:
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {t('request_list:dentistry')}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-2 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    شماره پیگیری
                  </h2>
                  <h2 className='font-semibold text-gray-800'>
                    {toPersianNumber(transaction.referenceNumber)}
                  </h2>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    تاریخ درخواست:
                  </h2>
                  <div className='text-center flex items-center'>
                    {new Date(transaction.createdAt).toLocaleTimeString(
                      'fa-IR',
                    ) +
                      ' - ' +
                      new Date(transaction.createdAt).toLocaleDateString(
                        'fa-IR',
                      )}
                  </div>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction_list:transaction_amount')}
                  </h2>
                  <div className='text-center flex items-center'>
                    {transaction.amount.toLocaleString('fa-IR')}
                  </div>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction_list:status')}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                  >
                    {label}
                  </span>
                </div>
                <div className='flex justify-between gap-2 items-center mb-4 '>
                  <h2 className='font-medium text-[#808080] text-[14px]'>
                    {t('transaction_list:name_recipient')}
                  </h2>

                  <div className='text-center flex items-center'>
                    {transaction.merchantName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
