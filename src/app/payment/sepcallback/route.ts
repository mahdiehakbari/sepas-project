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
import { NextResponse } from "next/server";

interface PaymentData {
  status?: string;
  trackId?: string;
  message?: string;
  amount?: number;
}

export async function POST(request: Request) {
  let data: PaymentData = {};

  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const text = await request.text();
      if (text) {
        data = JSON.parse(text);
      }
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        data.status = formData.get("status")?.toString();
        data.trackId = formData.get("trackId")?.toString();
        data.message = formData.get("message")?.toString();
        const amountStr = formData.get("amount")?.toString();
        if (amountStr) data.amount = Number(amountStr);
      }
    } else {
      console.warn("Empty or unknown body type in POST", contentType);
    }
  } catch (err) {
    console.warn("Error parsing body", err);
  }

  const status = data.status || "canceled";
  const trackId = data.trackId || "";
  const message =
    data.message || (status === "canceled" ? "تراکنش لغو شد" : "تراکنش ناموفق");
  const amount = data.amount || 0;

  const params = new URLSearchParams({
    status,
    trackId,
    message,
    amount: amount.toString(),
  });

  const frontUrl =
    process.env.NEXT_PUBLIC_FRONT_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://dentalit.sepasholding.com");

  const redirectUrl = `${frontUrl}/payment/result?${params.toString()}`;

  console.log("Redirecting to:", redirectUrl);

  // استفاده از status 303 برای تبدیل POST به GET
  return NextResponse.redirect(redirectUrl, { status: 303 });
}
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(request: Request) {
//   const data = await request.formData();
//   const refNum = data.get('RefNum')?.toString();
//   const amount = data.get('Amount')?.toString();

//   // ارسال به بک‌اند
//   const verifyRes = await axios.post(
//     'https://dentalitapi.sepasholding.com/api/Payment/sep/verify',
//     { refNum, amount },
//   );

//   console.log('Verify response:', verifyRes.data);

//   const params = new URLSearchParams({
//     status: verifyRes.data.success ? 'success' : 'failed',
//     message: verifyRes.data.message,
//   });

//   return NextResponse.redirect(
//     `https://dentalit.sepasholding.com/payment/result?${params.toString()}`,
//   );
// }
