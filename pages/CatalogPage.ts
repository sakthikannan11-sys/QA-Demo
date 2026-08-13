import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  readonly heading: Locator;
  readonly productCount: Locator;
  readonly username: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('catalog-heading');
    this.productCount = page.getByTestId('catalog-product-count');
    this.username = page.getByTestId('navbar-username');
  }

  async verifyLoggedIn(username: string) {
    await this.heading.waitFor();
    await this.username.filter({ hasText: username }).waitFor();
  }

  async openProduct(productName: string) {
    const link = this.page.getByRole('link', { name: new RegExp(productName, 'i') });

    for (const direction of [1, -1] as const) {
      for (let attempt = 0; attempt < 12; attempt++) {
        if (await link.count()) {
          await link.first().scrollIntoViewIfNeeded();
          if (await link.first().isVisible()) {
            await link.first().click();
            return;
          }
        }
        await this.page.mouse.wheel(0, 450 * direction);
        await this.page.waitForTimeout(250);
      }
    }

    throw new Error(`Product "${productName}" was not found after scrolling.`);
  }
}
