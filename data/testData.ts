import { env } from '../config/env';

export interface TestUser {
  username: string;
  password: string;
}

export interface Product {
  name: string;
  slug: string;
  price: string;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
}

export const TEST_USERS: Record<string, TestUser> = {
  standard: env.users.standard,
  locked: { username: 'locked_user', password: 'locked123' },
  admin: env.users.admin,
  invalid: { username: 'invalid_user', password: 'wrongpassword' },
};

export const PRODUCTS: Record<string, Product> = {
  wirelessMouse: { name: 'Wireless Mouse', slug: 'wireless-mouse', price: '$39.99' },
  webcam: { name: 'Webcam', slug: 'webcam', price: '$69.99' },
};

export const CHECKOUT_DATA: CheckoutData = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Test Street, Testville, CA 90210',
  cardNumber: '4242424242424242',
  expiry: '12/28',
  cvv: '123',
  cardholderName: 'John Doe',
};
