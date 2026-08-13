import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly viewCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId('product-detail-name');
    this.productPrice = page.getByTestId('product-detail-price');
    this.addToCartButton = page.getByTestId('product-add-to-cart-button');
    this.viewCartButton = page.getByTestId('product-view-cart-button');
  }

  async verifyProduct(name: string) {
    await this.productName.filter({ hasText: name }).waitFor();
  }

  async addToCart() {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('/api/cart/items') &&
          response.request().method() === 'POST' &&
          response.ok(),
      ),
      this.click(this.addToCartButton),
    ]);
    await this.viewCartButton.waitFor();
  }

  async goToCart() {
    await Promise.all([
      this.page.waitForURL(/cart/),
      this.click(this.viewCartButton),
    ]);
  }
}
