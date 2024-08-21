import { test, expect } from '@playwright/test';
import { MainPage } from '../supports/main-page';
import { Storages } from '../supports/storages_hanlder';
import { ProductCart } from '../supports/product_cart_page';



test.beforeEach(async ({page}) => {
        const storage = new Storages(page);
        const main_page = new MainPage(page);
        await main_page.goto('products/bezpieczenstwo-pracy/odziez-i-rekawice/rekawice/-42082.html');
        await storage.read_storage('accepted');
        await page.reload();
  });

test.describe('Product card', {
    
}, ()=>{
    test('add to cart ',{
        tag:'@positive',
    } ,async({page})=>{
        const product_cart = new ProductCart(page);
        await product_cart.add_to_cart();
        await product_cart.compare_price();
        
    
    })
    test('add to cart and close poup ',{
        tag:'@positive',
    } ,async({page})=>{
        const product_cart = new ProductCart(page);
        await product_cart.add_to_cart();
        await product_cart.close_by_x();
    })
    test('add to cart and continue shopping ',{
        tag:'@positive',
    } ,async({page})=>{
        const product_cart = new ProductCart(page);
        await product_cart.add_to_cart();
        await product_cart.continue_shopping();
    })
    test('set qty add to cart',{
        tag:'@positive',
    } ,async({page})=>{
        const product_cart = new ProductCart(page);
        await product_cart.change_qty(2);
        await product_cart.change_qty(3);
        await product_cart.add_to_cart();
    })
})