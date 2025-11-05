// import { NextResponse } from 'next/server';

// interface PaymentData {
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
//       if (text) {
//         data = JSON.parse(text);
//       }
//     } else if (
//       contentType.includes('application/x-www-form-urlencoded') ||
//       contentType.includes('multipart/form-data')
//     ) {
//       const formData = await request.formData().catch(() => null);
//       if (formData) {
//         data.status = formData.get('status')?.toString();
//         data.trackId = formData.get('trackId')?.toString();
//         data.message = formData.get('message')?.toString();
//         const amountStr = formData.get('amount')?.toString();
//         if (amountStr) data.amount = Number(amountStr);
//       }
//     } else {
//       console.warn('Empty or unknown body type in POST', contentType);
//     }
//   } catch (err) {
//     console.warn('Error parsing body', err);
//   }

//   const status = data.status || 'canceled';
//   const trackId = data.trackId || '';
//   const message =
//     data.message || (status === 'canceled' ? 'تراکنش لغو شد' : 'تراکنش ناموفق');
//   const amount = data.amount || 0;

//   const params = new URLSearchParams({
//     status,
//     trackId,
//     message,
//     amount: amount.toString(),
//   });

//   const frontUrl =
//     process.env.NEXT_PUBLIC_FRONT_URL ||
//     (process.env.NODE_ENV === 'development'
//       ? 'http://localhost:3000'
//       : 'https://dentalit.sepasholding.com');

//   const redirectUrl = `${frontUrl}/payment/result?${params.toString()}`;

//   console.log('Redirecting to:', redirectUrl);

//   // استفاده از status 303 برای تبدیل POST به GET
//   return NextResponse.redirect(redirectUrl, { status: 303 });
// }
import { NextResponse } from 'next/server';

interface PaymentData {
  status?: string;
  trackId?: string;
  message?: string;
  amount?: number;
}

export async function POST(request: Request) {
  let data: PaymentData = {};

  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const text = await request.text();
      if (text) {
        data = JSON.parse(text);
      }
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        data.status = formData.get('status')?.toString();
        data.trackId = formData.get('trackId')?.toString();
        data.message = formData.get('message')?.toString();
        const amountStr = formData.get('amount')?.toString();
        if (amountStr) data.amount = Number(amountStr);
      }
    } else {
      console.warn('Empty or unknown body type in POST', contentType);
    }
  } catch (err) {
    console.warn('Error parsing body', err);
  }

  // fallback امن
  const status = data.status || 'canceled';
  const trackId = data.trackId || '';
  const message =
    data.message || (status === 'canceled' ? 'تراکنش لغو شد' : 'تراکنش ناموفق');
  const amount = data.amount || 0;

  // 🧠 اینجا: درخواست وریفای به API بک‌اند
  try {
    const verifyResponse = await fetch(
      'https://dentalitapi.sepasholding.com/api/Payment/sep/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // ASP.NET معمولاً فرم می‌خواد نه JSON
        body: new URLSearchParams({
          refNum: trackId || '', // یا اگر refNum داری، جایگزین کن
          rrn: trackId || '', // اگر rrn جدا داری، مقدارش رو بفرست
          amount: amount.toString(),
        }).toString(),
      },
    );

    const verifyResult = await verifyResponse.json().catch(() => null);
    console.log('Verify result from API:', verifyResult);
  } catch (err) {
    console.error('Error calling verify API:', err);
  }

  // حالا ریدایرکت به صفحه نتیجه
  const frontUrl =
    process.env.NEXT_PUBLIC_FRONT_URL ||
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://dentalit.sepasholding.com');

  const params = new URLSearchParams({
    status,
    trackId,
    message,
    amount: amount.toString(),
  });

  const redirectUrl = `${frontUrl}/payment/result?${params.toString()}`;

  console.log('Redirecting to:', redirectUrl);

  return NextResponse.redirect(redirectUrl, { status: 303 });
}
