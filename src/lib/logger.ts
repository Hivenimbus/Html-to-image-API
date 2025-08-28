export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
}

class Logger {
  private logLevel: LogLevel;

  constructor() {
    const envLogLevel = process.env.LOG_LEVEL?.toLowerCase();
    switch (envLogLevel) {
      case 'debug':
        this.logLevel = LogLevel.DEBUG;
        break;
      case 'info':
        this.logLevel = LogLevel.INFO;
        break;
      case 'warn':
        this.logLevel = LogLevel.WARN;
        break;
      case 'error':
        this.logLevel = LogLevel.ERROR;
        break;
      default:
        this.logLevel = LogLevel.INFO;
    }
  }

  private formatLog(level: string, message: string, context?: string, data?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private log(level: LogLevel, levelName: string, message: string, context?: string, data?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const logEntry = this.formatLog(levelName, message, context, data);
    
    const logMessage = `[${logEntry.timestamp}] ${logEntry.level.toUpperCase()}${
      logEntry.context ? ` [${logEntry.context}]` : ''
    }: ${logEntry.message}`;

    if (level >= LogLevel.ERROR) {
      console.error(logMessage, data ? JSON.stringify(data, null, 2) : '');
    } else if (level >= LogLevel.WARN) {
      console.warn(logMessage, data ? JSON.stringify(data, null, 2) : '');
    } else {
      console.log(logMessage, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  debug(message: string, context?: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, context, data);
  }

  info(message: string, context?: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, 'INFO', message, context, data);
  }

  warn(message: string, context?: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, 'WARN', message, context, data);
  }

  error(message: string, context?: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, 'ERROR', message, context, data);
  }

  request(method: string, url: string, userAgent?: string, ip?: string): void {
    this.info(`${method} ${url}`, 'REQUEST', {
      userAgent,
      ip,
    });
  }

  response(method: string, url: string, statusCode: number, duration?: number): void {
    const level = statusCode >= 400 ? 'error' : 'info';
    this[level as 'info' | 'error'](
      `${method} ${url} - ${statusCode}`,
      'RESPONSE',
      {
        statusCode,
        duration: duration ? `${duration}ms` : undefined,
      }
    );
  }

  authFailure(ip?: string, userAgent?: string, reason?: string): void {
    this.warn('Authentication failed', 'AUTH', {
      ip,
      userAgent,
      reason,
    });
  }

  conversion(html: string, success: boolean, duration?: number, error?: string): void {
    const message = success 
      ? `HTML converted to PNG successfully` 
      : `HTML conversion failed: ${error}`;
    
    const logMethod = success ? 'info' : 'error';
    this[logMethod](message, 'CONVERSION', {
      htmlLength: html.length,
      duration: duration ? `${duration}ms` : undefined,
      error,
    });
  }
}

export const logger = new Logger();