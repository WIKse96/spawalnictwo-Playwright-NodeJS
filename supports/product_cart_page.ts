import { test, expect, type Page, type Locator } from '@playwright/test';
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
    readonly li_set_qty: Locator;


constructor(page:Page){
    this.page = page;
    this.add_to_cart_btn = page.getByRole('button', { name: 'Add to basket' });
    this.added_to_cart_info = page.getByText('Added to basket');
    this.price_prod_card = page.locator("//strong[@id='projector_price_value']");
    this.price_in_small_basket = page.locator("//strong[@class='topBasket__price']");
    this.price_in_popup = page.locator("//span[@class='price__unit']")
    this.goto_basket_btn = page.getByRole('link', { name: 'Go to basket' });
    this.close_popup = page.locator("//a[@class='modal__close']");
    this.popup_wrapper = page.locator("//div[@class='modal__wrapper']");
    this.continue_shopping_btn = page.getByRole('link', { name: 'Continue shopping' });
    this.set_qty_btn = page.locator("//select[@class='projector_buy__number-select f-select-select']");

}

async add_to_cart(){
    await this.add_to_cart_btn.click();
    await expect(this.added_to_cart_info).toBeVisible();
}

async compare_price(){
    const price_product_card = await this.price_prod_card.textContent();
    const price_in_popup = await this.price_in_popup.textContent();
    console.log(price_product_card)
    const price_in_small_basket = await this.price_in_small_basket.textContent();

    assert.strictEqual(price_in_popup, price_product_card, `Expected price ${price_product_card}, but got ${price_in_popup} in the popup.`);
    assert.strictEqual(price_in_popup, price_in_small_basket, `Expected price ${price_in_small_basket}, but got ${price_in_popup} in the popup.`)}
async goto_basket(){
    expect(this.popup_wrapper).toBeVisible;
    await this.goto_basket_btn.click();
}
async close_by_x(){
    expect(this.popup_wrapper).toBeVisible;
    await this.close_popup.click();
    expect(this.popup_wrapper).toBeHidden;
}
async continue_shopping(){
    const url_before = this.page.url()
    expect(this.popup_wrapper).toBeVisible;
    this.continue_shopping_btn.click();
    expect(this.popup_wrapper).toBeHidden;
    const url_after = this.page.url()

    assert.strictEqual(url_before, url_after, `Expected URLs are equal`)
}

async change_qty(qty: number) {
    const qtyString = qty.toString();
    if (qty > 5) {
        await this.set_qty_btn.selectOption('blue');
    } else {
        await this.set_qty_btn.selectOption({ value: qtyString });
    }
}
}