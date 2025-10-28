import { Button } from '@/sharedComponent/ui';
import { getThItems } from './constants';
export interface IRequest {
  id: number;
  plan: string;
  date: string;
  status: string;
  action?: string; // چون بعضی ردیف‌ها action ندارن
}

export interface IRequestListTableProps {
  requests: IRequest[];
}

export const RequestListTable = ({ requests }: IRequestListTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'تایید شده':
        return 'bg-green-100 text-green-700';
      case 'در حال بررسی':
        return 'bg-blue-100 text-blue-700';
      case 'رد شده':
        return 'bg-red-100 text-red-700';
      case 'پرداخت شده':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-separate [border-spacing:0_16px]'>
        <thead>
          <tr>
            <th colSpan={5} className='p-0'>
              <div className='flex bg-[var(--block-color)] border border-[var(--border-color)] rounded-[8px] px-3 py-3 font-semibold text-gray-700 text-sm'>
                {getThItems().map((item) => (
                  <div
                    key={item.id}
                    className='w-1/5 text-center border-l border-[var(--border-color)] last:border-none'
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td colSpan={5} className='p-0'>
                <div className='flex items-center justify-between bg-white border border-[var(--border-color)] rounded-[8px] px-3 py-3'>
                  <div className='w-[5%] text-center'>{req.id}</div>
                  <div className='w-[20%] text-center'>{req.plan}</div>
                  <div className='w-[20%] text-center'>{req.date}</div>
                  <div className='w-[20%] text-center'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        req.status,
                      )}`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className='w-[20%] text-center'>
                    {req.action && (
                      <Button className='w-[112px] text-[14px] font-[500]'>
                        {req.action}
                      </Button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
