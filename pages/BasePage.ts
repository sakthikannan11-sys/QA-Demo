import { Locator, Page } from '@playwright/test';

/**
 * Shared base class for all page objects.
 * Holds the Playwright Page instance and common UI actions
 * so child pages (Login, Cart, Checkout, etc.) stay DRY.
 */
export class BasePage {
  /**
   * @param page - Playwright Page bound to the current browser tab.
   *   Marked `protected` so subclasses can use `this.page` directly.
   */
  constructor(protected page: Page) {}

  /**
   * Navigates to a path relative to the configured baseURL
   * (or an absolute URL if a full URL is passed).
   */
  async goto(path: string) {
    await this.page.goto(path);
  }

  /**
   * Clicks a locator after Playwright's auto-waiting
   * (element must be visible, enabled, and stable).
   */
  async click(locator: Locator) {
    await locator.click();
  }

  /**
   * Clears an input and types the given value.
   * Prefer this over typing character-by-character for form fields.
   */
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }
}
