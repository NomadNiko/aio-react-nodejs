const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleMessages = [];
  const errors = [];

  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });

  page.on('pageerror', error => {
    errors.push(`Page error: ${error.message}`);
  });

  page.on('requestfailed', request => {
    errors.push(
      `Failed request: ${request.url()} - ${request.failure().errorText}`,
    );
  });

  console.log('Navigating to https://react.nomadsoft.us/...');
  await page.goto('https://react.nomadsoft.us/', { waitUntil: 'networkidle' });

  // Wait for any async operations
  await page.waitForTimeout(3000);

  console.log('\n=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));

  console.log('\n=== ERRORS ===');
  errors.forEach(error => console.log(error));

  console.log('\n=== PAGE INFO ===');
  console.log('Title:', await page.title());
  console.log('URL:', page.url());

  // Check if JavaScript files are loaded
  const scripts = await page.$$eval('script[src]', scripts =>
    scripts.map(script => script.src),
  );
  console.log('\n=== LOADED SCRIPTS ===');
  scripts.forEach(script => console.log(script));

  // Check the actual HTML
  const html = await page.content();
  console.log('\n=== BODY CONTENT (first 500 chars) ===');
  console.log(html.substring(0, 500));

  await browser.close();
})();
