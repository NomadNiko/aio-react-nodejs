const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to https://react.nomadsoft.us/...');
  await page.goto('https://react.nomadsoft.us/', { waitUntil: 'networkidle' });

  console.log('Taking screenshot...');
  await page.screenshot({
    path: '/var/www2/error-screenshot.png',
    fullPage: true,
  });

  console.log('Getting page content...');
  const content = await page.content();
  console.log('Page title:', await page.title());
  console.log('Page URL:', page.url());

  // Check for errors in console
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Wait a bit more for any console errors
  await page.waitForTimeout(2000);

  console.log('Console errors:', errors);
  console.log('App element exists:', await page.locator('#app').count());
  console.log('App element visible:', await page.locator('#app').isVisible());

  // Get the HTML of the app div
  const appHTML = await page
    .locator('#app')
    .innerHTML()
    .catch(() => 'Could not get innerHTML');
  console.log('App div content:', appHTML);

  await browser.close();
})();
