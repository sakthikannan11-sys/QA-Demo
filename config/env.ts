import dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://qademo.com',
  headless: process.env.HEADLESS !== 'false',
  captureScreenshots: process.env.CAPTURE_SCREENSHOTS === 'true',
  users: {
    standard: {
      username: process.env.STANDARD_USER ?? 'standard_user',
      password: process.env.STANDARD_PASSWORD ?? 'standard123',
    },
    admin: {
      username: process.env.ADMIN_USER ?? 'admin_user',
      password: process.env.ADMIN_PASSWORD ?? 'admin123',
    },
  },
};
