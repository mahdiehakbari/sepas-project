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
// import axios from 'axios'  // فعلاً نیاز نداریم

export async function POST(request: Request) {
  try {
    // داده‌ی خام ارسالی از بانک
    const data = await request.json();

    console.log('📦 Data from bank:', data);

    // فعلاً این بخش بررسی صحت پرداخت غیر فعال می‌مونه
    /*
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_UR}/payment/verify`,
      data,
    )
    const result = response.data
    */

    // برای تست، مستقیماً داده بانک رو به صفحه نتیجه بفرست
    const params = new URLSearchParams({
      status: data.status?.toString() || 'unknown',
      trackId: data.trackId?.toString() || '',
      message: data.message?.toString() || 'نتیجه تست از بانک',
      amount: data.amount?.toString() || '',
    });

    return NextResponse.redirect(
      `${
        process.env.NEXT_PUBLIC_FRONT_URL
      }/payment/result?${params.toString()}`,
    );
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONT_URL}/payment/result?status=failed&message=خطا در پردازش تراکنش`,
    );
  }
}
