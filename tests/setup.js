const { chromium } = require('@playwright/test');

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/assets\/?$/, { timeout: 30000 });
  
  await page.context().storageState({ path: 'tests/auth.json' });
  await browser.close();
  
  console.log('Login berhasil, session disimpan ke tests/auth.json');
}

module.exports = globalSetup;