'use client';

import { useSearchParams } from 'next/navigation';

export default function PaymentResult() {
  const params = useSearchParams();
  const status = params.get('status');
  const trackId = params.get('trackId');
  const message = params.get('message');
  const amount = params.get('amount');

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center'>
        <h1 className='text-2xl font-bold mb-4 text-blue-600'>
          نتیجه پرداخت (تست)
        </h1>

        <div className='text-gray-700 space-y-2'>
          <p>
            <span className='font-semibold'>وضعیت:</span> {status}
          </p>
          {trackId && (
            <p>
              <span className='font-semibold'>شماره پیگیری:</span> {trackId}
            </p>
          )}
          {amount && (
            <p>
              <span className='font-semibold'>مبلغ:</span>{' '}
              {Number(amount).toLocaleString('fa-IR')} تومان
            </p>
          )}
          <p>
            <span className='font-semibold'>پیام:</span> {message}
          </p>
        </div>
      </div>
    </div>
  );
}
