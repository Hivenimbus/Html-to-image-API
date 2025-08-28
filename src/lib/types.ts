export interface HtmlToImageRequest {
  html: string;
  width?: number;
  height?: number;
  quality?: number;
  fullPage?: boolean;
}

export interface ApiErrorResponse {
  error: string;
  code?: string;
  timestamp: string;
}

export interface ConversionOptions {
  width: number;
  height: number;
  quality: number;
  fullPage: boolean;
}

export const DEFAULT_CONVERSION_OPTIONS: ConversionOptions = {
  width: 1200,
  height: 800,
  quality: 90,
  fullPage: false,
};