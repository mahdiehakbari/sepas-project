// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(request: Request) {
//   try {
//     // داده‌ای که بانک ارسال کرده (حاوی شماره پیگیری و وضعیت پرداخت و ...)
//     const data = await request.json();

//     // ارسال داده‌ها به بک‌اند خودتون برای بررسی صحت پرداخت
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_UR}/payment/verify`,
//       data,
//     );

//     // نتیجه نهایی از بک‌اند (مثلاً success / fail)
//     const result = response.data;

//     // برمی‌گردونیم به بانک یا صفحه نتیجه
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Payment callback error:', error);
//     return NextResponse.json(
//       { success: false, message: 'خطا در پردازش تراکنش' },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let data = {};
  try {
    data = await request.json();
  } catch (err) {
    console.warn('No JSON body in request', err);
  }

  const status = data.status || 'canceled';
  const trackId = data.trackId || '';
  const message = data.message || 'تراکنش لغو شد';
  const amount = data.amount || 0;

  const params = new URLSearchParams({
    status,
    trackId,
    message,
    amount: amount.toString(),
  });

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_FRONT_URL}/payment/result?${params.toString()}`,
  );
}
