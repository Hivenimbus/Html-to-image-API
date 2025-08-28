import puppeteer, { Browser, Page } from 'puppeteer';
import { logger } from './logger';
import { ConversionOptions, DEFAULT_CONVERSION_OPTIONS } from './types';

let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.isConnected()) {
    logger.info('Starting new Puppeteer browser instance', 'PUPPETEER');
    
    browserInstance = await puppeteer.launch({
      headless: 'new',
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
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });

    logger.info('Puppeteer browser started successfully', 'PUPPETEER');
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
    page = await browser.newPage();

    await page.setViewport({
      width: finalOptions.width,
      height: finalOptions.height,
    });

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: finalOptions.fullPage,
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
        logger.warn('Failed to close Puppeteer page', 'PUPPETEER', { error: error.message });
      });
    }
  }
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance && browserInstance.isConnected()) {
    await browserInstance.close();
    browserInstance = null;
    logger.info('Puppeteer browser closed', 'PUPPETEER');
  }
}

process.on('beforeExit', () => {
  closeBrowser().catch((error) => {
    logger.error('Failed to close browser on exit', 'PUPPETEER', { error: error.message });
  });
});