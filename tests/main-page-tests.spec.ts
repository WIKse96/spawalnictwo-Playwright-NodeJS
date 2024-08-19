import { test, expect } from '@playwright/test';
import { MainPage } from '../supports/main-page';
import { Storages } from '../supports/storages_hanlder';
import {Menu} from '../supports/components/menu';



test('Main page entry tests', async ({ page }) => {
  const main_page = new MainPage(page);
  await main_page.goto('/');
  // Sprawdź czy strona ma tytuł.
  await expect(page).toHaveTitle(/Main page/);
});

test('Reject cookies', async ({ page }) => {
  const main_page = new MainPage(page);
  const storage_handler = new Storages(page)
  await main_page.goto('/');
  await main_page.verify_cookie_container();
  await main_page.reject_cookies();
  await main_page.verivy_cookie_container_invisible();
  // Parametr save_storage (nazwa pliku)
  await storage_handler.save_storage('rejected_cookie')
  await main_page.clear_cookies();


});
test('Accept cookies', async ({ page }) => {
  const main_page = new MainPage(page);
  const storage_handler = new Storages(page)
  await main_page.goto('/');
  await main_page.verify_cookie_container();

  await main_page.accept_cookies();
  await storage_handler.save_storage('accepted_cookie')
  await main_page.verivy_cookie_container_invisible();
  await main_page.clear_cookies()

});

test('Check main page', async({page})=>{
  const main_page = new MainPage(page);
  const storage_handler = new Storages(page)
  await main_page.goto('/');
  await storage_handler.read_storage('accepted');
  await page.reload();
  expect(page.getByRole('link', { name: 'Producenci' })).toBeVisible;

})
test('Menu tests', async ({page})=>{
  const main_page = new MainPage(page);
  const storage_handler = new Storages(page);
  const menu = new Menu(page)
  await main_page.goto('/');
  await storage_handler.read_storage('accepted');
  await page.reload();
  // TODO: Stworzyc testy dla menu
})