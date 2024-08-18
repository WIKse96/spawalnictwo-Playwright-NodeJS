import { test, expect } from '@playwright/test';
import { MainPage } from '../supports/main-page';
import { Storages } from '../supports/storages_hanlder';

test('add to cart [positive]', async({page})=>{
    const main_page = new MainPage(page);
    await main_page.goto('products/bezpieczenstwo-pracy/odziez-i-rekawice/rekawice/-42082.html');
    
})