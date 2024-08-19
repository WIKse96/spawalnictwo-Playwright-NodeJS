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
    test('add to cart and go to basket ',{
        tag:'@positive',
    } ,async({page})=>{
        const product_cart = new ProductCart(page);
        await product_cart.add_to_cart();
        await product_cart.goto_basket();

        expect(page).toHaveURL(/.*basket/);
        expect(page.getByRole('heading', { name: 'Your basket' })).toBeVisible  // TODO: Przenieść do klasy koszyka jak będzie

    

        
    
    })
})