import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://dentalitapi.sepasholding.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forwardRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forwardRequest(request, path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forwardRequest(request, path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forwardRequest(request, path, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forwardRequest(request, path, 'PATCH');
}

async function forwardRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  try {
    const apiPath = path.join('/');
    const url = `${API_BASE_URL}/${apiPath}`;
    
    // Copy search params
    const searchParams = request.nextUrl.searchParams.toString();
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;

    // Copy headers
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Skip host header
      if (key.toLowerCase() !== 'host') {
        headers.set(key, value);
      }
    });

    // Get body for methods that support it
    let body = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      body = await request.text();
    }

    // Forward request
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body || undefined,
    });

    // Copy response headers
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      responseHeaders.set(key, value);
    });

    // Return response
    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('API forwarding error:', error);
    return NextResponse.json(
      { error: 'Failed to forward request' },
      { status: 500 }
    );
  }
}
