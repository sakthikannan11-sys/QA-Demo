# TestQA — Simple Playwright Framework

End-to-end tests for [qademo.com](https://qademo.com) using Playwright, TypeScript, and a small Page Object Model.

**Flow:** Login → Catalog → Product → Cart → Checkout → Order Confirmation

---

## Project Structure

```
TestQA/
├── data/
│   └── testData.ts           # Users, products, checkout data
├── fixtures/
│   └── test-fixtures.ts      # Custom Playwright fixtures (page objects + screenshots)
├── utils/
│   └── ScreenshotHelper.ts   # Named step screenshots for tests
├── pages/
│   ├── BasePage.ts           # Shared goto, click, fill helpers
│   ├── LoginPage.ts
│   ├── CatalogPage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
├── tests/
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts
└── package.json
```

---

## How It Works

1. **BasePage** — small parent class with `goto`, `click`, and `fill`
2. **Page classes** — one class per screen with locators and actions
3. **Fixtures** — Playwright injects page objects and a `screenshots` helper into tests automatically
4. **Tests** — request fixtures by name and call page methods

```typescript
import { test, expect } from '../fixtures/test-fixtures';

test('standard user can sign in', async ({ page, loginPage, screenshots }) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'standard123');
  await expect(page).not.toHaveURL(/login/);
  await screenshots.capture('login-success');
});
```

Each page object is registered once in `fixtures/test-fixtures.ts` via `test.extend()`, so tests stay clean and page objects are created per test with the correct `page` instance.

---

## Screenshots

The framework supports two screenshot modes:

| Mode | When | Where |
|------|------|-------|
| **Failure screenshots** | Any test fails | `test-results/` (Playwright built-in) |
| **Step screenshots** | `CAPTURE_SCREENSHOTS=true` | `screenshots/<suite>/<test>/` |

Step screenshots are captured with the `screenshots` fixture:

```typescript
await screenshots.capture('catalog-page');           // full page (default)
await screenshots.capture('header', { fullPage: false }); // viewport only
```

Files are numbered by step order, attached to the HTML report, and ignored by git.

```bash
npm run test:screenshots          # run all tests with step screenshots
npm run test:checkout             # checkout flow (add CAPTURE_SCREENSHOTS=true in .env)
```

---

## Quick Start

```bash
npm install
npx playwright install chromium
npm test
```

### Run options

```bash
npm run test:headed       # watch the browser
npm run test:login        # login tests only
npm run test:checkout     # checkout flow only
npm run test:ui           # Playwright UI mode
npm run report            # open HTML report
```

### Environment (optional)

Create a `.env` file to override defaults:

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://qademo.com` | Application under test |
| `HEADLESS` | `true` | Set to `false` to see the browser |
| `CAPTURE_SCREENSHOTS` | `false` | Set to `true` to save step screenshots |

---

## Test Coverage

| Suite | Tests | Description |
|-------|-------|-------------|
| `login.spec.ts` | 4 | Valid login, admin login, locked user, invalid credentials |
| `checkout.spec.ts` | 1 | Full 8-step checkout flow |

---

## Adding a New Test

1. Add a page class in `pages/` extending `BasePage`
2. Register it in `fixtures/test-fixtures.ts`
3. Add test data to `data/testData.ts` if needed
4. Request the fixture in your test: `async ({ myPage }) => { ... }`

---

## License

MIT
# QA-Demo
