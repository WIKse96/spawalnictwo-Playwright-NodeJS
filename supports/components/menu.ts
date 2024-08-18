
import { expect, type Locator, type Page, type BrowserContext } from '@playwright/test';
export class Menu {
    readonly page: Page;
    readonly menu_ul: Locator;

constructor(page: Page){
    this.page = page;
    this.menu_ul = this.page.locator("//ul[@class='navbar-nav mx-md-n2']/li[@class='nav-item']");
    
}


}