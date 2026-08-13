import { test, expect } from '../fixtures/test-fixtures';
import { CHECKOUT_DATA, PRODUCTS, TEST_USERS } from '../data/testData';

test.describe('Checkout flow', () => {
  test('standard user can search product, add to cart, and place order', async ({
    page,
    loginPage,
    catalogPage,
    productPage,
    cartPage,
    checkoutPage,
    orderConfirmationPage,
    screenshots,
  }) => {
    await test.step('1. Login with standard user', async () => {
      await loginPage.open();
      await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
      await expect(page).toHaveURL(/catalog/);
      await screenshots.capture('login-success');
    });

    await test.step('2. Verify catalog page after login', async () => {
      await catalogPage.verifyLoggedIn(TEST_USERS.standard.username);
      await expect(catalogPage.heading).toHaveText('Product Catalog');
      await expect(catalogPage.productCount).toBeVisible();
      await screenshots.capture('catalog-page');
    });

    await test.step('3. Search Webcam on catalog (scroll if needed)', async () => {
      await catalogPage.openProduct(PRODUCTS.webcam.name);
      await expect(page).toHaveURL(new RegExp(`/products/${PRODUCTS.webcam.slug}`));
      await screenshots.capture('product-search');
    });

    await test.step('4. Verify product page and add to cart', async () => {
      await productPage.verifyProduct(PRODUCTS.webcam.name);
      await expect(productPage.productPrice).toContainText(PRODUCTS.webcam.price);
      await productPage.addToCart();
      await screenshots.capture('product-added-to-cart');
    });

    await test.step('5. View cart', async () => {
      await productPage.goToCart();
      await expect(page).toHaveURL(/cart/);
      await cartPage.verifyProductInCart(PRODUCTS.webcam.name);
      await screenshots.capture('cart-page');
    });

    await test.step('6. Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(/checkout/);
      await checkoutPage.waitForPage(PRODUCTS.webcam.name);
      await screenshots.capture('checkout-page');
    });

    await test.step('7. Fill dummy checkout data and place order', async () => {
      await checkoutPage.fillShippingAndPayment();
      await checkoutPage.waitForPage(PRODUCTS.webcam.name);
      await checkoutPage.placeOrder();
      await screenshots.capture('order-placed');
    });

    await test.step('8. Verify order confirmation page', async () => {
      await orderConfirmationPage.verifyOrderPlaced();
      await expect(orderConfirmationPage.heading).toHaveText('Order Confirmed!');
      await expect(orderConfirmationPage.shippingName).toContainText(CHECKOUT_DATA.cardholderName);
      await screenshots.capture('order-confirmation');
    });
  });
});
