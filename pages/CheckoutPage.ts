import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CHECKOUT_DATA, CheckoutData } from '../data/testData';

export class CheckoutPage extends BasePage {
  readonly heading: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly expiryInput: Locator;
  private readonly cvvInput: Locator;
  private readonly cardholderNameInput: Locator;
  private readonly placeOrderButton: Locator;
  private readonly cartEmptyAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('checkout-heading');
    this.firstNameInput = page.getByTestId('checkout-first-name');
    this.lastNameInput = page.getByTestId('checkout-last-name');
    this.addressInput = page.getByTestId('checkout-address');
    this.cardNumberInput = page.getByTestId('checkout-card-number');
    this.expiryInput = page.getByTestId('checkout-expiry');
    this.cvvInput = page.getByTestId('checkout-cvv');
    this.cardholderNameInput = page.getByTestId('checkout-cardholder-name');
    this.placeOrderButton = page.getByTestId('place-order-button');
    this.cartEmptyAlert = page.getByRole('alert').filter({ hasText: 'Cart is empty' });
  }

  async waitForPage(productName?: string) {
    await this.page.getByTestId('checkout-page').waitFor();
    await this.heading.waitFor();
    if (productName) {
      await this.page.getByRole('main').getByText(productName).waitFor();
    }
    await expect(this.cartEmptyAlert).not.toBeVisible();
    await expect(this.placeOrderButton).toBeEnabled();
    await expect(this.placeOrderButton).toContainText(/\$\d+\.\d{2}/);
  }

  async fillShippingAndPayment(data: CheckoutData = CHECKOUT_DATA) {
    await this.fill(this.firstNameInput, data.firstName);
    await this.fill(this.lastNameInput, data.lastName);
    await this.fill(this.addressInput, data.address);
    await this.fill(this.cardNumberInput, data.cardNumber);
    await this.fill(this.expiryInput, data.expiry);
    await this.fill(this.cvvInput, data.cvv);
    await this.fill(this.cardholderNameInput, data.cardholderName);
  }

  async placeOrder() {
    await expect(this.cartEmptyAlert).not.toBeVisible();
    await this.placeOrderButton.scrollIntoViewIfNeeded();

    const orderResponse = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('/api/orders') && response.request().method() === 'POST',
      ),
      this.placeOrderButton.click(),
    ]).then(([response]) => response);

    if (!orderResponse.ok()) {
      const body = await orderResponse.text();
      throw new Error(`Order placement failed (${orderResponse.status()}): ${body}`);
    }

    await expect(this.page).toHaveURL(/orders\/\d+/);
  }
}
