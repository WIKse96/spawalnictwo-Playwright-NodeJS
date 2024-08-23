import { expect, type Page, type Locator } from '@playwright/test';
import * as assert from 'assert';

export class ProductCart {
  readonly page: Page;
  readonly add_to_cart_btn: Locator;
  readonly added_to_cart_info: Locator;
  readonly price_prod_card: Locator;
  readonly price_in_popup: Locator;
  readonly price_in_small_basket: Locator;
  readonly goto_basket_btn: Locator;
  readonly close_popup: Locator;
  readonly popup_wrapper: Locator;
  readonly continue_shopping_btn: Locator;
  readonly set_qty_btn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.add_to_cart_btn = page.getByRole('button', { name: 'Add to basket' });
    this.added_to_cart_info = page.getByText('Added to basket');
    this.price_prod_card = page.locator("//strong[@id='projector_price_value']");
    this.price_in_popup = page.locator("//span[@class='price__unit']");
    this.price_in_small_basket = page.locator("//strong[@class='topBasket__price']");
    this.goto_basket_btn = page.getByRole('link', { name: 'Go to basket' });
    this.close_popup = page.locator("//a[@class='modal__close']");
    this.popup_wrapper = page.locator("//div[@class='modal__wrapper']");
    this.continue_shopping_btn = page.getByRole('link', { name: 'Continue shopping' });
    this.set_qty_btn = page.locator("//select[@class='projector_buy__number-select f-select-select']");
  }

  async add_to_cart() {
    await this.add_to_cart_btn.click();
    await expect(this.added_to_cart_info).toBeVisible();
  }

  async compare_price() {
    const priceProductCard = await this.price_prod_card.textContent();
    const priceInPopup = await this.price_in_popup.textContent();
    const priceInSmallBasket = await this.price_in_small_basket.textContent();

    assert.strictEqual(priceInPopup, priceProductCard, `Expected price ${priceProductCard}, but got ${priceInPopup} in the popup.`);
    assert.strictEqual(priceInPopup, priceInSmallBasket, `Expected price ${priceInSmallBasket}, but got ${priceInPopup} in the popup.`);
  }

  async goto_basket() {
    await expect(this.popup_wrapper).toBeVisible();
    await this.goto_basket_btn.click();
  }

  async close_by_x() {
    await expect(this.popup_wrapper).toBeVisible();
    await this.close_popup.click();
    await expect(this.popup_wrapper).toBeHidden();
  }

  async continue_shopping() {
    const urlBefore = this.page.url();
    await expect(this.popup_wrapper).toBeVisible();
    await this.continue_shopping_btn.click();
    await expect(this.popup_wrapper).toBeHidden();
    const urlAfter = this.page.url();

    assert.strictEqual(urlBefore, urlAfter, `Expected URLs to be equal.`);
  }

  async change_qty(qty: number) {
    const qtyString = qty.toString();
    await this.set_qty_btn.selectOption({ value: qtyString });
  }
}
