import { test, expect, type Page, type Locator } from '@playwright/test';
import * as assert from 'assert';

export class ProductCart {
    readonly page: Page;
    readonly add_to_cart_btn: Locator;
    readonly added_to_cart_info: Locator;
    readonly price_prod_card: Locator;
    readonly price_in_popup: Locator;
    readonly goto_basket_btn: Locator;


constructor(page:Page){
    this.page = page;
    this.add_to_cart_btn = page.getByRole('button', { name: 'Add to basket' });
    this.added_to_cart_info = page.getByText('Added to basket');
    this.price_prod_card = page.locator("//strong[@id='projector_price_value']");
    this.price_in_popup = page.locator("//span[@class='price__unit']")
    this.goto_basket_btn = page.getByRole('link', { name: 'Go to basket' })

}

async add_to_cart(){
    await this.add_to_cart_btn.click();
    await expect(this.added_to_cart_info).toBeVisible();
}

async compare_price(){
    const price_product_card = await this.price_prod_card.textContent();
    const price_in_popup = await this.price_in_popup.textContent();
    console.log(price_product_card)


    assert.strictEqual(price_in_popup, price_product_card, `Expected price ${price_product_card}, but got ${price_in_popup} in the popup.`);
}
async goto_basket(){
   await this.goto_basket_btn.click()
}

}