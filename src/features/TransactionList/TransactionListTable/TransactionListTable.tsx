'use client';
import { getThItems } from './constants';
import { useTranslation } from 'react-i18next';
import { ITransactionListTableProps } from './types';
import { useStatus } from './utils/useStatus';
import { toPersianNumber } from '@/features/requestList/RequestListTable/utils/PersianNumbr';

export const TransactionListTable = ({
  transactions,
  currentPage,
  pageSize,
}: ITransactionListTableProps) => {
  const { t } = useTranslation();
  const { getStatus } = useStatus();

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate [border-spacing:0_16px]'>
        <thead>
          <tr>
            <th colSpan={5} className='p-0'>
              <div className='flex bg-(--block-color) border border-border-color rounded-lg px-3 py-3 font-semibold text-gray-700 text-sm'>
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
          {transactions.map((transaction, index) => {
            const { label, className } = getStatus(transaction.status);
            return (
              <tr key={transaction.id}>
                <td colSpan={5} className='p-0'>
                  <div className='flex items-center justify-between bg-white border border-border-color rounded-lg px-3 py-3'>
                    <div className='w-[15%] text-right'>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </div>
                    <div className='w-[15%] text-center'>
                      {toPersianNumber(transaction.referenceNumber)}
                    </div>
                    <div className='w-[20%] text-center'>
                      {t('request_list:dentistry')}
                    </div>
                    <div className='w-[20%] text-center'>
                      {new Date(transaction.createdAt).toLocaleTimeString(
                        'fa-IR',
                      ) +
                        ' - ' +
                        new Date(transaction.createdAt).toLocaleDateString(
                          'fa-IR',
                        )}
                    </div>
                    <div className='w-[20%] text-center'>
                      {transaction.amount.toLocaleString('fa-IR')}
                    </div>
                    <div className='w-[20%] text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
                      >
                        {label}
                      </span>
                    </div>

                    <div className='w-[20%] text-center'>
                      {transaction.merchantName}
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
