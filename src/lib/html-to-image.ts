import { chromium, Browser, Page } from '@playwright/browser-chromium';
import { logger } from './logger';
import { ConversionOptions, DEFAULT_CONVERSION_OPTIONS } from './types';

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.isConnected()) {
    logger.info('Starting new Playwright browser instance', 'PLAYWRIGHT');
    
    try {
      browserInstance = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-ipc-flooding-protection',
        ],
      });

      logger.info('Playwright browser started successfully', 'PLAYWRIGHT');
    } catch (error) {
      logger.error('Failed to launch browser', 'PLAYWRIGHT', { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }
  
  return browserInstance;
}

export async function convertHtmlToPng(
  html: string, 
  options: Partial<ConversionOptions> = {}
): Promise<Buffer> {
  const startTime = Date.now();
  let page: Page | null = null;
  
  try {
    const finalOptions = { ...DEFAULT_CONVERSION_OPTIONS, ...options };
    
    logger.info('Starting HTML to PNG conversion', 'CONVERSION', {
      htmlLength: html.length,
      options: finalOptions,
    });

    const browser = await getBrowser();
    page = await browser.newPage({
      viewport: {
        width: finalOptions.width,
        height: finalOptions.height,
      },
    });

    const fullHtml = html.includes('<html>') ? html : `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              box-sizing: border-box;
            }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    await page.setContent(fullHtml, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: finalOptions.fullPage,
      omitBackground: finalOptions.transparent,
      clip: finalOptions.fullPage ? undefined : {
        x: 0,
        y: 0,
        width: finalOptions.width,
        height: finalOptions.height,
      },
    });

    const duration = Date.now() - startTime;
    logger.conversion(html, true, duration);

    return Buffer.from(screenshot);
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    logger.conversion(html, false, duration, errorMessage);
    throw new Error(`HTML to PNG conversion failed: ${errorMessage}`);
  } finally {
    if (page) {
      await page.close().catch((error) => {
        logger.warn('Failed to close Playwright page', 'PLAYWRIGHT', { error: error instanceof Error ? error.message : 'Unknown error' });
      });
    }
  }
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance && browserInstance.isConnected()) {
    await browserInstance.close();
    browserInstance = null;
    logger.info('Playwright browser closed', 'PLAYWRIGHT');
  }
}

process.on('beforeExit', () => {
  closeBrowser().catch((error) => {
    logger.error('Failed to close browser on exit', 'PLAYWRIGHT', { error: error instanceof Error ? error.message : 'Unknown error' });
  });
});