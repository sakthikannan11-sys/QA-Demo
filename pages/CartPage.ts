import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly heading: Locator;
  private readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('cart-heading');
    this.proceedToCheckoutButton = page.getByTestId('proceed-to-checkout-button');
  }

  cartItem(productName: string): Locator {
    return this.page.locator('[data-testid^="cart-item-"]').filter({
      has: this.page.locator('[data-testid^="cart-item-name-"]', { hasText: productName }),
    });
  }

  async verifyProductInCart(productName: string) {
    await this.heading.waitFor();
    await this.cartItem(productName).waitFor();
  }

  async proceedToCheckout() {
    await Promise.all([
      this.page.waitForURL(/checkout/),
      this.click(this.proceedToCheckoutButton),
    ]);
  }
}
