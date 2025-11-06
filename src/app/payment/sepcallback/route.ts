import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: Record<string, string> = {};

    // گرفتن داده از بانک
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // برای x-www-form-urlencoded باید از text و URLSearchParams استفاده کنید
      const text = await request.text();
      const params = new URLSearchParams(text);

      // تبدیل URLSearchParams به object
      params.forEach((value, key) => {
        data[key] = value;
      });
    } else if (contentType.includes('multipart/form-data')) {
      // فقط برای multipart/form-data از formData استفاده کنید
      const formData = await request.formData();
      formData.forEach((v, k) => (data[k] = v.toString()));
    } else {
      console.warn('⚠️ Unknown content type:', contentType);
    }

    // آماده‌سازی بدنه برای verify
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

    try {
      // ارسال درخواست به API بک‌اند
      const verifyResponse = await axios.post(
        'http://localhost:3838/api/Payment/sep/verify',
        verifyBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // برگردوندن مستقیم پاسخ برای تست
      return NextResponse.json({
        data,
        contentType,
        success: true,
        sent: verifyBody,
        response: verifyResponse.data,
      });
    } catch (error) {
      // خطا در پارس کردن body
      if (axios.isAxiosError(error)) {
        return NextResponse.json(
          {
            data,
            contentType,
            error: true,
            message: error.message,
            details: error.response?.data,
          },
          { status: error.response?.status || 500 }
        );
      }

      return NextResponse.json(
        {
          data,
          contentType,
          error: true,
          message: error instanceof Error ? error.message : "Server error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Server error", },
      { status: 500 },
    );
  }
}
