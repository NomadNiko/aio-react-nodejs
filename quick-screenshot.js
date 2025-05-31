const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to https://react.nomadsoft.us/...');
  await page.goto('https://react.nomadsoft.us/', {
    waitUntil: 'domcontentloaded',
    timeout: 10000,
  });

  // Wait a moment for React to render
  await page.waitForTimeout(3000);

  console.log('Taking screenshot...');
  await page.screenshot({
    path: '/var/www2/fixed-screenshot.png',
    fullPage: true,
  });

  console.log('App element visible:', await page.locator('#app').isVisible());

  await browser.close();
  console.log('Screenshot saved to fixed-screenshot.png');
})();
