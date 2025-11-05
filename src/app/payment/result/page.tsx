'use client';

import { useSearchParams } from 'next/navigation';

export default function PaymentResult() {
  const params = useSearchParams();
  const status = params.get('status') || 'unknown';
  const trackId = params.get('trackId') || '';
  const message = params.get('message') || '';
  const amount = params.get('amount') || '0';

  const isSuccess = status === 'success';

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center'>
        <h1
          className={`text-2xl font-bold mb-4 ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isSuccess ? 'پرداخت موفق 🎉' : 'پرداخت ناموفق ❌'}
        </h1>

        <div className='text-gray-700 space-y-2'>
          <p>
            <span className='font-semibold'>پیام:</span> {message}
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
        </div>

        <button
          onClick={() => (window.location.href = '/')}
          className='mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
