// import axios from 'axios';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const contentType = request.headers.get('content-type') || '';
//     let data: Record<string, string> = {};

//     // گرفتن داده از بانک
//     if (contentType.includes('application/json')) {
//       data = await request.json();
//     } else if (contentType.includes('application/x-www-form-urlencoded')) {
//       // برای x-www-form-urlencoded باید از text و URLSearchParams استفاده کنید
//       const text = await request.text();
//       const params = new URLSearchParams(text);

//       // تبدیل URLSearchParams به object
//       params.forEach((value, key) => {
//         data[key] = value;
//       });
//     } else if (contentType.includes('multipart/form-data')) {
//       // فقط برای multipart/form-data از formData استفاده کنید
//       const formData = await request.formData();
//       formData.forEach((v, k) => (data[k] = v.toString()));
//     } else {
//       console.warn('⚠️ Unknown content type:', contentType);
//     }

//     // آماده‌سازی بدنه برای verify
//     const verifyBody = {
//       state: data.State || '',
//       status: parseInt(data.Status || '0', 10),
//       rrn: data.Rrn || '',
//       refNum: data.RefNum || '',
//       resNum: data.ResNum || '',
//       terminalId: data.TerminalId || '',
//       traceNo: data.TraceNo || '',
//       amount: parseInt(data.Amount || '0', 10),
//       wage: parseInt(data.Wage || '0', 10),
//       securePan: data.SecurePan || '',
//       token: data.Token || '',
//       mid: data.MID || '',
//       affectiveAmount: parseInt(data.AffectiveAmount || '0', 10),
//       hashCardNumber: data.HashedCardNumber || '',
//     };

//     try {
//       // ارسال درخواست به API بک‌اند
//       const verifyResponse = await axios.post(
//         'http://localhost:3838/api/Payment/sep/verify',
//         verifyBody,
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       // برگردوندن مستقیم پاسخ برای تست
//       return NextResponse.json({
//         data,
//         contentType,
//         success: true,
//         sent: verifyBody,
//         response: verifyResponse.data,
//       });
//     } catch (error) {
//       // خطا در پارس کردن body
//       if (axios.isAxiosError(error)) {
//         return NextResponse.json(
//           {
//             data,
//             contentType,
//             error: true,
//             message: error.message,
//             details: error.response?.data,
//           },
//           { status: error.response?.status || 500 }
//         );
//       }

//       return NextResponse.json(
//         {
//           data,
//           contentType,
//           error: true,
//           message: error instanceof Error ? error.message : "Server error",
//         },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: error instanceof Error ? error.message : "Server error", },
//       { status: 500 },
//     );
//   }
// }

// import axios from 'axios';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const contentType = request.headers.get('content-type') || '';
//     let data: Record<string, string> = {};

//     // 📦 تبدیل ورودی به JSON
//     if (contentType.includes('application/json')) {
//       data = await request.json();
//     } else if (contentType.includes('application/x-www-form-urlencoded')) {
//       const text = await request.text();
//       const params = new URLSearchParams(text);
//       params.forEach((value, key) => (data[key] = value));
//     } else if (contentType.includes('multipart/form-data')) {
//       const formData = await request.formData();
//       formData.forEach((v, k) => (data[k] = v.toString()));
//     }

//     // 🧾 بدنه‌ی درخواست وریفای
//     const verifyBody = {
//       state: data.State || '',
//       status: parseInt(data.Status || '0', 10),
//       rrn: data.Rrn || '',
//       refNum: data.RefNum || '',
//       resNum: data.ResNum || '',
//       terminalId: data.TerminalId || '',
//       traceNo: data.TraceNo || '',
//       amount: parseInt(data.Amount || '0', 10),
//       wage: parseInt(data.Wage || '0', 10),
//       securePan: data.SecurePan || '',
//       token: data.Token || '',
//       mid: data.MID || '',
//       affectiveAmount: parseInt(data.AffectiveAmount || '0', 10),
//       hashCardNumber: data.HashedCardNumber || '',
//     };

//     // 🔍 ارسال برای وریفای
//     const verifyResponse = await axios.post(
//       'http://localhost:3838/api/Payment/sep/verify',
//       verifyBody,
//       {
//         headers: { 'Content-Type': 'application/json' },
//         validateStatus: () => true,
//       },
//     );

//     const resData = verifyResponse.data;
//     const isSuccess = resData?.success === true;

//     // 🍪 ذخیره اطلاعات در کوکی
//     const cookieData = {
//       status: isSuccess ? 'true' : 'false',
//       rrn: resData?.rrn || data.Rrn || '',
//       message: resData?.message || '',
//       amount: data.Amount || '0',
//       creditRequestId: resData?.creditRequestId || '',
//       ipgTransactionId: resData?.ipgTransactionId || '',
//     };

//     const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL;
//     const response = NextResponse.redirect(`${baseUrl}/payment/result`);

//     response.cookies.set('payment_result', JSON.stringify(cookieData), {
//       path: '/',
//       httpOnly: false,
//       maxAge: 60 * 10,
//     });

//     return response;
//   } catch (error) {
//     console.error('Verify error:', error);
//     const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL;
//     const res = NextResponse.redirect(`${baseUrl}/payment/result`);
//     res.cookies.set(
//       'payment_result',
//       JSON.stringify({ status: 'false', message: 'Server error' }),
//       { path: '/', httpOnly: false },
//     );
//     return res;
//   }
// }

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// 📁 مسیر فایل لاگ
const LOG_FILE = path.join(process.cwd(), 'logs', 'payment.log');

// ✍️ تابع کمکی برای نوشتن لاگ در فایل
function writeLog(message: any) {
  try {
    const dir = path.dirname(LOG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const time = new Date().toISOString();
    const formatted =
      `\n[${time}] ===============================\n` +
      (typeof message === 'string'
        ? message
        : JSON.stringify(message, null, 2)) +
      '\n----------------------------------------\n';
    fs.appendFileSync(LOG_FILE, formatted, 'utf8');
  } catch (err) {
    console.error('❌ Error writing log:', err);
  }
}

export async function POST(request: Request) {
  writeLog('📥 [Payment Callback] Request received');

  try {
    const contentType = request.headers.get('content-type') || '';
    writeLog(`📦 Content-Type: ${contentType}`);

    let data: Record<string, string> = {};

    // 🧩 خواندن داده از درگاه
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      params.forEach((value, key) => (data[key] = value));
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      formData.forEach((v, k) => (data[k] = v.toString()));
    }

    writeLog({ '📨 Raw Data from bank': data });

    // 🧾 بدنه verify
    const verifyBody = {
      state: data.State || '',
      status: parseInt(data.Status || '0', 10),
      rrn: data.Rrn || '',
      refNum: data.RefNum || '',
      resNum: data.ResNum || '',
      terminalId: data.TerminalId || '',
      traceNo: data.TraceNo || '',
      amount: parseInt(data.Amount || '0', 10),
      wage: parseInt(data.Wage || '0', 10),
      securePan: data.SecurePan || '',
      token: data.Token || '',
      mid: data.MID || '',
      affectiveAmount: parseInt(data.AffectiveAmount || '0', 10),
      hashCardNumber: data.HashedCardNumber || '',
    };

    writeLog({ '📤 Verify Body': verifyBody });

    // 🔍 ارسال به بک‌اند وریفای
    const verifyResponse = await axios.post(
      'http://localhost:3838/api/Payment/sep/verify',
      verifyBody,
      {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: () => true,
      },
    );

    writeLog({ '✅ Verify Response': verifyResponse.data });

    const resData = verifyResponse.data;
    const isSuccess = resData?.success === true;

    // 🍪 ساخت داده برای کوکی
    const cookieData = {
      status: isSuccess ? 'true' : 'false',
      rrn: resData?.rrn || data.Rrn || '',
      message: resData?.message || '',
      amount: data.Amount || '0',
      creditRequestId: resData?.creditRequestId || '',
      ipgTransactionId: resData?.ipgTransactionId || '',
    };

    writeLog({ '🍪 Cookie Data': cookieData });

    // 🌍 ریدایرکت
    const baseUrl =
      process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/payment/result`;

    writeLog(`🌍 Redirecting to: ${redirectUrl}`);

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set('payment_result', JSON.stringify(cookieData), {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 10,
    });

    writeLog('🚀 Redirect successful.');
    return response;
  } catch (error: any) {
    writeLog({
      '❌ Verify error': error?.response?.data || error?.message || error,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000';
    const res = NextResponse.redirect(`${baseUrl}/payment/result`);
    res.cookies.set(
      'payment_result',
      JSON.stringify({
        status: 'false',
        message: error?.message || 'Server error',
      }),
      { path: '/', httpOnly: false },
    );

    return res;
  }
}
