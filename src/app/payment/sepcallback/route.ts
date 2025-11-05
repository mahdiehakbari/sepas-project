/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from 'next/server';

// interface PaymentData {
//   [key: string]: unknown; // تا هرچی اومد بگیره
//   status?: string;
//   trackId?: string;
//   message?: string;
//   amount?: number;
// }

// export async function POST(request: Request) {
//   let data: PaymentData = {};

//   try {
//     const contentType = request.headers.get('content-type') || '';

//     if (contentType.includes('application/json')) {
//       const text = await request.text();
//       if (text) data = JSON.parse(text);
//     } else if (
//       contentType.includes('application/x-www-form-urlencoded') ||
//       contentType.includes('multipart/form-data')
//     ) {
//       const formData = await request.formData().catch(() => null);
//       if (formData) {
//         formData.forEach((value, key) => {
//           data[key] = value.toString();
//         });
//       }
//     } else {
//       console.warn('Empty or unknown body type in POST', contentType);
//     }
//   } catch (err) {
//     console.warn('Error parsing body', err);
//   }

//   // fallback‌ها
//   const status = data.status || 'canceled';
//   const trackId = data.trackId || '';
//   const message =
//     data.message || (status === 'canceled' ? 'تراکنش لغو شد' : 'تراکنش ناموفق');
//   const amount = Number(data.amount) || 0;

//   // 🧠 ارسال کل داده به API بک‌اند
//   try {
//     const formBody = new URLSearchParams();
//     Object.entries(data).forEach(([key, value]) => {
//       formBody.append(key, String(value ?? ''));
//     });

//     const verifyResponse = await fetch(
//       'https://dentalitapi.sepasholding.com/api/Payment/sep/verify',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: formBody.toString(),
//       },
//     );

//     const verifyResult = await verifyResponse.json().catch(() => null);
//     console.log('Verify result from API:', verifyResult);
//   } catch (err) {
//     console.error('Error calling verify API:', err);
//   }

//   // ریدایرکت به صفحه نتیجه
//   const frontUrl =
//     process.env.NEXT_PUBLIC_FRONT_URL ||
//     (process.env.NODE_ENV === 'development'
//       ? 'http://localhost:3000'
//       : 'https://dentalit.sepasholding.com');

//   const params = new URLSearchParams({
//     status,
//     trackId,
//     message,
//     amount: amount.toString(),
//   });

//   const redirectUrl = `${frontUrl}/payment/result?${params.toString()}`;
//   console.log('Redirecting to:', redirectUrl);

//   return NextResponse.redirect(redirectUrl, { status: 303 });
// }

import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: Record<string, string> = {};

    // گرفتن داده از درگاه (ممکنه JSON یا form باشه)
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      formData.forEach((v, k) => (data[k] = v.toString()));
    } else {
      console.warn('Unknown content type:', contentType);
    }

    console.log('📥 داده‌های رسیده از بانک:', data);

    // آماده‌سازی داده برای Verify API (حتماً باید همه‌ی فیلدها پاس داده بشن)
    const verifyBody = {
      state: data.state || '',
      status: data.status || '',
      rrn: data.rrn || '',
      refNum: data.refNum || '',
      resNum: data.resNum || '',
      terminalId: data.terminalId || '',
      traceNo: data.traceNo || '',
      amount: data.amount || '',
      wage: data.wage || '',
      securePan: data.securePan || '',
      token: data.token || '',
      mid: data.mid || '',
      affectiveAmount: data.affectiveAmount || '',
      hashCardNumber: data.hashCardNumber || '',
    };

    // ارسال به API بک‌اند
    const verifyResponse = await axios.post(
      'https://dentalitapi.sepasholding.com/api/Payment/sep/verify',
      verifyBody,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    console.log('✅ نتیجه Verify از API:', verifyResponse.data);

    // مقادیر لازم برای ریدایرکت
    const status = data.status || 'canceled';
    const trackId = data.refNum || data.traceNo || '';
    const message =
      status === 'success'
        ? 'پرداخت موفق بود 🎉'
        : 'تراکنش لغو یا ناموفق بود ❌';
    const amount = data.amount || '0';

    const params = new URLSearchParams({
      status,
      // trackId,
      message,
      amount,
    });

    const frontUrl =
      process.env.NEXT_PUBLIC_FRONT_URL ||
      (process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://dentalit.sepasholding.com');

    const redirectUrl = `${frontUrl}/payment/result?${params.toString()}`;
    console.log('➡️ ریدایرکت به:', redirectUrl);

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (err: any) {
    console.error('❌ خطا در verify:', err?.message || err);
    return NextResponse.json(
      { error: true, message: err?.message || 'Server error' },
      { status: 500 },
    );
  }
}
