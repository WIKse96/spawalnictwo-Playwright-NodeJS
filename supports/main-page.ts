import { expect, type Locator, type Page, type BrowserContext } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly h1: Locator;
  readonly search: Locator;
  readonly cookie_container: Locator;
  readonly accept_cookie_btn: Locator;
  readonly reject_cookie_btn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h1 = page.getByRole('heading');
    this.search = page.locator("//input[@placeholder='Wpisz czego szukasz']");
    this.cookie_container = page.getByText('This page uses cookie files');
    this.accept_cookie_btn = page.getByText('I AGREE, I WANT TO GO TO THE');
    this.reject_cookie_btn = page.getByText('I DO NOT AGREE');
    this.context = this.page.context();
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clear_cookies() {
    await this.context.clearCookies();
  }

  async verify_cookie_container() {
    await expect(this.cookie_container).toBeVisible();
  }

  async accept_cookies() {
    await this.accept_cookie_btn.click();
  }

  async reject_cookies() {
    await this.reject_cookie_btn.click();
  }

  async verivy_cookie_container_invisible() {
    await expect(this.cookie_container).toBeHidden();
  }
}
