import { test, expect } from '@playwright/test';
import { MainPage } from '../supports/main-page';
import { Storages } from '../supports/storages_hanlder';
import { Menu } from '../supports/components/menu';

test.describe('Main Page Tests', () => {
  let mainPage: MainPage;
  let storageHandler: Storages;
  let menu: Menu;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    storageHandler = new Storages(page);
    menu = new Menu(page);
  });

  test('Main page entry test', async ({ page }) => {
    await mainPage.goto('/');
    await expect(page).toHaveTitle(/Main page/);
  });

  test('Reject cookies', async ({ page }) => {
    await mainPage.goto('/');
    await mainPage.verify_cookie_container();
    await mainPage.reject_cookies();
    await mainPage.verivy_cookie_container_invisible();
    await storageHandler.save_storage('rejected_cookie');
    await mainPage.clear_cookies();
  });

  test('Accept cookies', async ({ page }) => {
    await mainPage.goto('/');
    await mainPage.verify_cookie_container();
    await mainPage.accept_cookies();
    await storageHandler.save_storage('accepted_cookie');
    await mainPage.verivy_cookie_container_invisible();
    await mainPage.clear_cookies();
  });

  test('Check main page with accepted cookies', async ({ page }) => {
    await mainPage.goto('/');
    await storageHandler.read_storage('accepted');
    await page.reload();
    await expect(page.getByRole('link', { name: 'Producenci' })).toBeVisible();
  });

  test('Menu tests', async ({ page }) => {
    await mainPage.goto('/');
    await storageHandler.read_storage('accepted');
    await page.reload();
    // TODO: Implement tests for menu interactions
  });
});
