import { NextRequest } from 'next/server';
import { logger } from './logger';

export interface AuthResult {
  isValid: boolean;
  error?: string;
}

export function validateApiToken(request: NextRequest): AuthResult {
  const authHeader = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'Unknown';

  if (!authHeader) {
    logger.authFailure(ip, userAgent, 'Missing authorization header');
    return {
      isValid: false,
      error: 'Authorization header is required'
    };
  }

  if (!authHeader.startsWith('Bearer ')) {
    logger.authFailure(ip, userAgent, 'Invalid authorization format');
    return {
      isValid: false,
      error: 'Authorization header must use Bearer token format'
    };
  }

  const token = authHeader.substring(7);
  const expectedToken = process.env.API_TOKEN;

  if (!expectedToken) {
    logger.error('API_TOKEN environment variable not configured', 'AUTH');
    return {
      isValid: false,
      error: 'Server configuration error'
    };
  }

  if (token !== expectedToken) {
    logger.authFailure(ip, userAgent, 'Invalid token provided');
    return {
      isValid: false,
      error: 'Invalid API token'
    };
  }

  logger.debug('API token validated successfully', 'AUTH', { ip, userAgent });
  return { isValid: true };
}