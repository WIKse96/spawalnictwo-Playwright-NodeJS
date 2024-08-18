import { test, expect, type Page, type Locator } from '@playwright/test';

export class ProductCart {
    readonly page: Page;
    readonly add_to_cart_btn: Locator;
    readonly added_to_cart_info: Locator;
constructor(page:Page){
    this.page = page;
    this.add_to_cart_btn = page.getByRole('button', { name: 'Add to basket' });
    this.added_to_cart_info = page.getByText('Added to basket');

}

async add_to_cart(){
    await this.add_to_cart_btn.click();
    await expect(this.added_to_cart_info).toBeVisible();
}
}