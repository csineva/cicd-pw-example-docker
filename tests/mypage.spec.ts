import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Szabadság-szobor tippjáték tesztek', () => {
  test.beforeEach(async ({ page }) => {
    await allure.epic('Szabadság-szobor app');
    await page.goto('http://localhost:8080/');
  });

  test('1. Alacsonyabb tipp esetén figyelmeztet, hogy a helyes érték nagyobb', async ({ page }) => {
    await allure.description('Kisebb szám bevitele esetén ellenőrzi a figyelmeztető üzenetet és a piros betűszínt');
    await allure.feature('Tipp ellenőrzés');
    await allure.severity('normal');
    await allure.tag('lower-guess');

    const input = page.locator('#tipp-input');
    const button = page.getByRole('button', { name: 'Tipp' });
    const result = page.locator('#result');

    await allure.step('50-es érték beírása', async () => {
      await input.fill('50');
    });

    await allure.step('Tipp gombra kattintás', async () => {
      await button.click();
    });

    await allure.step('Eredmény és stílus ellenőrzése', async () => {
      await expect(result).toHaveText('Nem, ennél nagyobb.');
      await expect(result).toHaveCSS('color', 'rgb(255, 0, 0)');
    });
  });

  test('2. Magasabb tipp esetén figyelmeztet, hogy a helyes érték kisebb', async ({ page }) => {
    await allure.description('Nagyobb szám bevitele esetén ellenőrzi a figyelmeztető üzenetet és a piros betűszínt');
    await allure.feature('Tipp ellenőrzés');
    await allure.severity('normal');
    await allure.tag('higher-guess');

    const input = page.locator('#tipp-input');
    const button = page.getByRole('button', { name: 'Tipp' });
    const result = page.locator('#result');

    await allure.step('120-as érték beírása', async () => {
      await input.fill('120');
    });

    await allure.step('Tipp gombra kattintás', async () => {
      await button.click();
    });

    await allure.step('Eredmény és stílus ellenőrzése', async () => {
      await expect(result).toHaveText('Nem, ennél kisebb.');
      await expect(result).toHaveCSS('color', 'rgb(255, 0, 0)');
    });
  });

  test('3. Helyes tipp (93) esetén elismerő üzenetet jelenít meg', async ({ page }) => {
    await allure.description('A pontos 93-as érték bevitele esetén ellenőrzi a sikerüzenetet és a zöld betűszínt');
    await allure.feature('Tipp ellenőrzés');
    await allure.severity('critical');
    await allure.tag('correct-guess');

    const input = page.locator('#tipp-input');
    const button = page.getByRole('button', { name: 'Tipp' });
    const result = page.locator('#result');

    await allure.step('93-as helyes érték beírása', async () => {
      await input.fill('93');
    });

    await allure.step('Tipp gombra kattintás', async () => {
      await button.click();
    });

    await allure.step('Sikerüzenet és stílus ellenőrzése', async () => {
      await expect(result).toHaveText('Gratulálok, eltaláltad!');
      await expect(result).toHaveCSS('color', 'rgb(0, 128, 0)');
    });
  });
});
