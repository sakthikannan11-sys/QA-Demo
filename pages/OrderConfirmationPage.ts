import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly heading: Locator;
  readonly orderNumber: Locator;
  readonly shippingName: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('order-confirmation-heading');
    this.orderNumber = page.getByTestId('order-confirmation-number');
    this.shippingName = page.getByTestId('order-shipping-name');
  }

  async verifyOrderPlaced() {
    await this.page.getByTestId('order-confirmation-page').waitFor();
    await this.heading.waitFor();
    await this.orderNumber.waitFor();
  }
}
