import { type Page, type BrowserContext } from '@playwright/test';

export class Storages {
  readonly page: Page;
  readonly context: BrowserContext;



constructor(page: Page){
    this.page = page;

    this.context = this.page.context();

}
// podaj nazwę pliku
async save_storage(name: string){
    await this.context.storageState({ path: `storages/storageState_${name}.json` });
    console.log('Stan zapisany!');
}

  // Wczytaj stan storage z pliku
  async read_storage(name: string) {
    const storagePath = `storages/storageState_${name}.json`;
    await this.context.addInitScript(() => {
      const json = require(storagePath);
      for (const key in json.localStorage) {
        window.localStorage.setItem(key, json.localStorage[key]);
      }
    });
    console.log('Stan odczytany i załadowany!', `storages/storageState_${name}.json`);
  }
  
 
 
}
