import { test, expect } from '@playwright/test';
import { MainPage } from '../supports/main-page';
import { Storages } from '../supports/storages_hanlder';
import { ProductCart } from '../supports/product_cart_page';

test.describe('Product card', () => {
  let storage: Storages;
  let mainPage: MainPage;
  let productCart: ProductCart;

  test.beforeEach(async ({ page }) => {
    storage = new Storages(page);
    mainPage = new MainPage(page);
    productCart = new ProductCart(page);

    await mainPage.goto('products/bezpieczenstwo-pracy/odziez-i-rekawice/rekawice/-42082.html');
    await storage.read_storage('accepted');
    await page.reload();
  });

  test('Add to cart', async ({ page }) => {
    await productCart.add_to_cart();
    await productCart.compare_price();
  });

  test('Add to cart and close popup', async ({ page }) => {
    await productCart.add_to_cart();
    await productCart.close_by_x();
  });

  test('Add to cart and continue shopping', async ({ page }) => {
    await productCart.add_to_cart();
    await productCart.continue_shopping();
  });

  test('Set quantity and add to cart', async ({ page }) => {
    await productCart.change_qty(2);
    await productCart.add_to_cart();
  });
});
