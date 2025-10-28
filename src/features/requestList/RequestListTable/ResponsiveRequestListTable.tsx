import { Button } from '@/sharedComponent/ui';

interface IDisplayRequest {
  name: string;
  status: string;
  date: string;
}

interface IResponsiveRequestListTableProps {
  requests: IDisplayRequest[];
}

export const ResponsiveRequestListTable = ({
  requests,
}: IResponsiveRequestListTableProps) => {
  const statusStyles: { [key: string]: string } = {
    'تایید شده': 'bg-green-100 text-green-800',
    'درحال بررسی': 'bg-blue-100 text-blue-800',
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      {requests.map((req, index) => (
        <div key={index}>
          <div className='border-2 border-[var(--border-color)] rounded-lg mb-4'>
            <div className=' p-4 '>
              <div className='flex justify-between items-center mb-2 '>
                <h2 className='font-semibold text-gray-800'>{`نام طرح: ${req.name}`}</h2>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    statusStyles[req.status]
                  }`}
                >
                  {req.status}
                </span>
              </div>
              <p className='text-gray-600 mb-4'>{`تاریخ درخواست: ${req.date}`}</p>
            </div>
            {req.status === 'تایید شده' && (
              <div className='border-t border-[var(--border-color)]  p-4'>
                <Button className='w-full  p-4 '>پرداخت آبو‌مان</Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
