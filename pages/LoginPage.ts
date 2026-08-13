import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('username-input');
    this.password = page.getByTestId('password-input');
    this.signInButton = page.getByTestId('login-submit-button');
    this.errorMessage = page.getByRole('alert');
  }

  async open() {
    await this.goto('/login');
  }

  async login(username: string, password: string) {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.signInButton);
  }
}