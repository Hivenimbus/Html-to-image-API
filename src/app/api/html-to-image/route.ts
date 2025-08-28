import { NextRequest, NextResponse } from 'next/server';
import { validateApiToken } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { convertHtmlToPng } from '@/lib/html-to-image';
import { HtmlToImageRequest, ApiErrorResponse } from '@/lib/types';

function createErrorResponse(error: string, status: number): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'Unknown';
  
  logger.request('POST', '/api/html-to-image', userAgent, ip);

  try {
    const authResult = validateApiToken(request);
    if (!authResult.isValid) {
      const duration = Date.now() - startTime;
      logger.response('POST', '/api/html-to-image', 401, duration);
      return createErrorResponse(authResult.error || 'Unauthorized', 401);
    }

    let body: HtmlToImageRequest;
    try {
      body = await request.json();
    } catch {
      const duration = Date.now() - startTime;
      logger.response('POST', '/api/html-to-image', 400, duration);
      return createErrorResponse('Invalid JSON in request body', 400);
    }

    if (!body.html || typeof body.html !== 'string') {
      const duration = Date.now() - startTime;
      logger.response('POST', '/api/html-to-image', 400, duration);
      return createErrorResponse('HTML string is required', 400);
    }

    if (body.html.trim().length === 0) {
      const duration = Date.now() - startTime;
      logger.response('POST', '/api/html-to-image', 400, duration);
      return createErrorResponse('HTML cannot be empty', 400);
    }

    const options = {
      ...(body.width && body.width > 0 && { width: body.width }),
      ...(body.height && body.height > 0 && { height: body.height }),
      ...(body.quality && body.quality > 0 && body.quality <= 100 && { quality: body.quality }),
      ...(body.fullPage === true && { fullPage: true }),
      ...(body.transparent === true && { transparent: true }),
    };

    const imageBuffer = await convertHtmlToPng(body.html, options);

    const duration = Date.now() - startTime;
    logger.response('POST', '/api/html-to-image', 200, duration);

    return new NextResponse(imageBuffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    logger.error('Conversion request failed', 'API', {
      error: errorMessage,
      ip,
      userAgent,
      duration: `${duration}ms`,
    });

    logger.response('POST', '/api/html-to-image', 500, duration);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function GET() {
  logger.info('Health check requested', 'API');
  return NextResponse.json({
    status: 'healthy',
    service: 'html-to-image-api',
    timestamp: new Date().toISOString(),
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}