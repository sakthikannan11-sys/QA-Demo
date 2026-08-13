import fs from 'fs';
import path from 'path';
import { Page, TestInfo } from '@playwright/test';
import { env } from '../config/env';

export type ScreenshotOptions = {
  fullPage?: boolean;
};

/** Captures named screenshots per test and attaches them to the HTML report. */
export class ScreenshotHelper {
  private readonly enabled = env.captureScreenshots;
  private readonly outputDir = path.join('screenshots', ...this.testInfo.titlePath.map(sanitize));
  private stepIndex = 0;

  constructor(
    private readonly page: Page,
    private readonly testInfo: TestInfo,
  ) {}

  get isEnabled(): boolean {
    return this.enabled;
  }

  /** Save a screenshot for the current step and attach it to the test report. */
  async capture(stepName: string, options: ScreenshotOptions = {}): Promise<string | undefined> {
    if (!this.enabled) return;

    this.stepIndex += 1;
    const fileName = `${String(this.stepIndex).padStart(2, '0')}-${sanitize(stepName)}.png`;
    const filePath = path.join(this.outputDir, fileName);

    fs.mkdirSync(this.outputDir, { recursive: true });
    await this.page.screenshot({
      path: filePath,
      fullPage: options.fullPage ?? true,
    });

    await this.testInfo.attach(stepName, {
      path: filePath,
      contentType: 'image/png',
    });

    return filePath;
  }
}

function sanitize(value: string): string {
  return value.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}
