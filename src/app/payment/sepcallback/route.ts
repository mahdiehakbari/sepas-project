// import { NextResponse } from 'next/server';

// interface PaymentData {
//   status?: string | undefined;
//   trackId?: string;
//   message?: string;
//   amount?: number;
// }

// export async function POST(request: Request) {
//   let data: PaymentData = {};

//   try {
//     const contentType = request.headers.get('content-type') || '';

//     if (contentType.includes('application/json')) {
//       // دریافت JSON
//       data = await request.json();
//     } else if (
//       contentType.includes('application/x-www-form-urlencoded') ||
//       contentType.includes('multipart/form-data')
//     ) {
//       // دریافت formData
//       const formData = await request.formData().catch(() => null);
//       if (formData) {
//         data.status = formData.get('status')?.toString();
//         data.trackId = formData.get('trackId')?.toString();
//         data.message = formData.get('message')?.toString();
//         const amountStr = formData.get('amount')?.toString();
//         if (amountStr) data.amount = Number(amountStr);
//       }
//     }
//   } catch (err) {
//     console.warn('No valid body in request', err);
//   }

//   // fallback امن
//   const status = data.status || 'canceled';
//   const trackId = data.trackId || '';
//   const message =
//     data.message || (status === 'canceled' ? 'تراکنش لغو شد' : 'تراکنش ناموفق');
//   const amount = data.amount || 0;

//   // ساخت query params
//   const params = new URLSearchParams({
//     status,
//     trackId,
//     message,
//     amount: amount.toString(),
//   });

//   // redirect به صفحه نتیجه
//   return NextResponse.redirect(
//     `${process.env.NEXT_PUBLIC_FRONT_URL}/payment/result?${params.toString()}`,
//   );
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

  // ✅ تشخیص آدرس فرانت براساس محیط
  const frontUrl =
    process.env.NEXT_PUBLIC_FRONT_URL ||
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://dentalit.sepasholding.com');

  const redirectUrl = `${frontUrl}/payment/result?${params.toString()}`;

  try {
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('Redirect failed', err);
    return NextResponse.json(
      { success: false, message: 'خطا در redirect' },
      { status: 500 },
    );
  }
}
