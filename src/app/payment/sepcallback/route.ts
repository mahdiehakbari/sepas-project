import { NextResponse } from 'next/server';

interface PaymentData {
  [key: string]: unknown; // تا هرچی اومد بگیره
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
      if (text) data = JSON.parse(text);
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        formData.forEach((value, key) => {
          data[key] = value.toString();
        });
      }
    } else {
      console.warn('Empty or unknown body type in POST', contentType);
    }
  } catch (err) {
    console.warn('Error parsing body', err);
  }

  // fallback‌ها
  const status = data.status || 'canceled';
  const trackId = data.trackId || '';
  const message =
    data.message || (status === 'canceled' ? 'تراکنش لغو شد' : 'تراکنش ناموفق');
  const amount = Number(data.amount) || 0;

  // 🧠 ارسال کل داده به API بک‌اند
  try {
    const formBody = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formBody.append(key, String(value ?? ''));
    });

    const verifyResponse = await fetch(
      'https://dentalitapi.sepasholding.com/api/Payment/sep/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      },
    );

    const verifyResult = await verifyResponse.json().catch(() => null);
    console.log('Verify result from API:', verifyResult);
  } catch (err) {
    console.error('Error calling verify API:', err);
  }

  // ریدایرکت به صفحه نتیجه
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
