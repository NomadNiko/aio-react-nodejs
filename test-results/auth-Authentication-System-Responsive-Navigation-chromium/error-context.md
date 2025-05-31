# Test info

- Name: Authentication System >> Responsive Navigation
- Location: /var/www2/tests/auth.spec.js:237:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('button[aria-expanded]')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('button[aria-expanded]')

    at /var/www2/tests/auth.spec.js:249:57
```

# Page snapshot

```yaml
- navigation:
  - text: Business Solutions
  - button
- main:
  - heading "Welcome to Business Solutions" [level=1]
  - paragraph: Empowering your business with innovative solutions and exceptional service
  - button "Get Started Today"
  - heading "About Our Company" [level=2]
  - paragraph: We are a leading provider of comprehensive business solutions, dedicated to helping companies of all sizes achieve their goals. With years of experience and a team of experts, we deliver results that matter.
  - paragraph: Our mission is to provide innovative, cost-effective solutions that drive growth and success for our clients. We believe in building long-term partnerships based on trust, transparency, and exceptional service.
  - text: Professional Business Team
  - heading "Why Choose Us" [level=2]
  - heading "Expert Team" [level=3]
  - paragraph: Our experienced professionals bring deep industry knowledge and proven expertise to every project.
  - heading "Proven Results" [level=3]
  - paragraph: We have a track record of delivering measurable results that exceed our clients expectations.
  - heading "Custom Solutions" [level=3]
  - paragraph: Every business is unique. We tailor our approach to meet your specific needs and objectives.
```

# Test source

```ts
  149 |     // Refresh the token
  150 |     const refreshResponse = await request.post(`${BASE_URL}/api/auth/refresh`, {
  151 |       data: {
  152 |         refreshToken,
  153 |       },
  154 |     });
  155 |
  156 |     expect(refreshResponse.status()).toBe(200);
  157 |
  158 |     const refreshData = await refreshResponse.json();
  159 |     expect(refreshData.success).toBe(true);
  160 |     expect(refreshData.tokens.accessToken).toBeDefined();
  161 |     expect(refreshData.tokens.refreshToken).toBeDefined();
  162 |     // Tokens should be different from original
  163 |     expect(refreshData.tokens.accessToken).not.toBe(
  164 |       loginData.tokens.accessToken,
  165 |     );
  166 |   });
  167 |
  168 |   test('Admin User Management Access', async ({ request }) => {
  169 |     // Try to access admin endpoints as regular user
  170 |     const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
  171 |       data: {
  172 |         email: TEST_USER.email,
  173 |         password: TEST_USER.password,
  174 |       },
  175 |     });
  176 |
  177 |     const loginData = await loginResponse.json();
  178 |     const { accessToken } = loginData.tokens;
  179 |
  180 |     // Try to access admin-only endpoint
  181 |     const usersResponse = await request.get(`${BASE_URL}/api/users`, {
  182 |       headers: {
  183 |         Authorization: `Bearer ${accessToken}`,
  184 |       },
  185 |     });
  186 |
  187 |     expect(usersResponse.status()).toBe(403);
  188 |
  189 |     const usersData = await usersResponse.json();
  190 |     expect(usersData.success).toBe(false);
  191 |     expect(usersData.message).toContain('permissions');
  192 |   });
  193 |
  194 |   test('Contact Form API', async ({ request }) => {
  195 |     const contactData = {
  196 |       name: 'Test User',
  197 |       email: 'test@example.com',
  198 |       message: 'This is a test message from Playwright',
  199 |     };
  200 |
  201 |     const response = await request.post(`${BASE_URL}/api/contact`, {
  202 |       data: contactData,
  203 |     });
  204 |
  205 |     expect(response.status()).toBe(200);
  206 |
  207 |     const data = await response.json();
  208 |     expect(data.success).toBe(true);
  209 |     expect(data.message).toContain('sent successfully');
  210 |   });
  211 |
  212 |   test('Language Selector Functionality', async ({ page }) => {
  213 |     await page.goto('/');
  214 |
  215 |     // Wait for page to load
  216 |     await page.waitForLoadState('networkidle');
  217 |
  218 |     // Check if language flags are present
  219 |     const flags = page.locator('button img[src*="flag-"]');
  220 |     await expect(flags).toHaveCount(3);
  221 |
  222 |     // Check if flags are clickable
  223 |     const usFlag = page.locator('button img[src*="flag-us"]').first();
  224 |     await expect(usFlag).toBeVisible();
  225 |
  226 |     const esFlag = page.locator('button img[src*="flag-es"]').first();
  227 |     await expect(esFlag).toBeVisible();
  228 |
  229 |     const deFlag = page.locator('button img[src*="flag-de"]').first();
  230 |     await expect(deFlag).toBeVisible();
  231 |
  232 |     // Test clicking language flags (should not cause errors)
  233 |     await esFlag.click();
  234 |     await usFlag.click();
  235 |   });
  236 |
  237 |   test('Responsive Navigation', async ({ page }) => {
  238 |     // Test desktop navigation
  239 |     await page.goto('/');
  240 |     await page.setViewportSize({ width: 1200, height: 800 });
  241 |
  242 |     // Should see full navigation menu
  243 |     await expect(page.locator('nav ul')).toBeVisible();
  244 |
  245 |     // Test mobile navigation
  246 |     await page.setViewportSize({ width: 375, height: 667 });
  247 |
  248 |     // Should see hamburger menu
> 249 |     await expect(page.locator('button[aria-expanded]')).toBeVisible();
      |                                                         ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  250 |
  251 |     // Click hamburger menu
  252 |     const hamburger = page
  253 |       .locator('button')
  254 |       .filter({ hasText: /menu|☰/ })
  255 |       .or(
  256 |         page
  257 |           .locator('button:has(span)')
  258 |           .filter({ hasNotText: /\w/ })
  259 |           .first(),
  260 |       );
  261 |
  262 |     if ((await hamburger.count()) > 0) {
  263 |       await hamburger.click();
  264 |
  265 |       // Mobile menu should appear
  266 |       await expect(page.locator('nav ul')).toBeVisible();
  267 |     }
  268 |   });
  269 |
  270 |   test.afterAll(async ({ request }) => {
  271 |     // Clean up test user
  272 |     try {
  273 |       const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
  274 |         data: {
  275 |           email: TEST_USER.email,
  276 |           password: TEST_USER.password,
  277 |         },
  278 |       });
  279 |
  280 |       if (loginResponse.ok()) {
  281 |         await request.post(`${BASE_URL}/api/auth/logout`);
  282 |       }
  283 |     } catch (error) {
  284 |       // Ignore cleanup errors
  285 |     }
  286 |   });
  287 | });
  288 |
```