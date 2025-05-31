# Test info

- Name: Authentication System >> should load the main application
- Location: /var/www2/tests/auth.spec.js:18:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)

Locator: locator('img[alt*="English"], img[alt*="Español"], img[alt*="Deutsch"]')
Expected: 3
Received: 6
Call log:
  - expect.toHaveCount with timeout 5000ms
  - waiting for locator('img[alt*="English"], img[alt*="Español"], img[alt*="Deutsch"]')
    9 × locator resolved to 6 elements
      - unexpected value "6"

    at /var/www2/tests/auth.spec.js:33:7
```

# Page snapshot

```yaml
- navigation:
  - text: Business Solutions
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link "Services":
        - /url: /services
    - listitem:
      - link "Results":
        - /url: /results
    - listitem:
      - link "Contact":
        - /url: /contact
  - link "Login":
    - /url: /login
  - link "Register":
    - /url: /register
  - button "English":
    - img "English"
  - button "Español":
    - img "Español"
  - button "Deutsch":
    - img "Deutsch"
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
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | // Test configuration
   4 | const BASE_URL = 'http://localhost:3000';
   5 | const TEST_USER = {
   6 |   email: 'playwright@example.com',
   7 |   password: 'test123456',
   8 |   firstName: 'Playwright',
   9 |   lastName: 'User',
   10 | };
   11 |
   12 | test.describe('Authentication System', () => {
   13 |   test.beforeAll(async ({ request }) => {
   14 |     // Clean up any existing test user
   15 |     await request.post(`${BASE_URL}/api/auth/logout`).catch(() => {});
   16 |   });
   17 |
   18 |   test('should load the main application', async ({ page }) => {
   19 |     await page.goto('/');
   20 |     await expect(page).toHaveTitle(/React.js Boilerplate/);
   21 |
   22 |     // Check if the app has loaded properly
   23 |     await expect(page.locator('#app')).toBeVisible();
   24 |
   25 |     // Should see navigation with language flags
   26 |     await expect(page.locator('nav')).toBeVisible();
   27 |
   28 |     // Should see language flags
   29 |     await expect(
   30 |       page.locator(
   31 |         'img[alt*="English"], img[alt*="Español"], img[alt*="Deutsch"]',
   32 |       ),
>  33 |     ).toHaveCount(3);
      |       ^ Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)
   34 |   });
   35 |
   36 |   test('API Health Check', async ({ request }) => {
   37 |     const response = await request.get(`${BASE_URL}/api/health`);
   38 |     expect(response.ok()).toBeTruthy();
   39 |
   40 |     const data = await response.json();
   41 |     expect(data.status).toBe('OK');
   42 |     expect(data.timestamp).toBeDefined();
   43 |   });
   44 |
   45 |   test('Authentication endpoints without token should fail', async ({
   46 |     request,
   47 |   }) => {
   48 |     const response = await request.get(`${BASE_URL}/api/auth/me`);
   49 |     expect(response.status()).toBe(401);
   50 |
   51 |     const data = await response.json();
   52 |     expect(data.success).toBe(false);
   53 |     expect(data.message).toContain('token');
   54 |   });
   55 |
   56 |   test('User Registration Flow', async ({ request }) => {
   57 |     // Register new user
   58 |     const registerResponse = await request.post(
   59 |       `${BASE_URL}/api/auth/register`,
   60 |       {
   61 |         data: TEST_USER,
   62 |       },
   63 |     );
   64 |
   65 |     expect(registerResponse.status()).toBe(201);
   66 |
   67 |     const registerData = await registerResponse.json();
   68 |     expect(registerData.success).toBe(true);
   69 |     expect(registerData.user.email).toBe(TEST_USER.email);
   70 |     expect(registerData.user.firstName).toBe(TEST_USER.firstName);
   71 |     expect(registerData.user.lastName).toBe(TEST_USER.lastName);
   72 |     expect(registerData.user.role).toBe('user');
   73 |     expect(registerData.tokens.accessToken).toBeDefined();
   74 |     expect(registerData.tokens.refreshToken).toBeDefined();
   75 |   });
   76 |
   77 |   test('User Login Flow', async ({ request }) => {
   78 |     // Login with the registered user
   79 |     const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
   80 |       data: {
   81 |         email: TEST_USER.email,
   82 |         password: TEST_USER.password,
   83 |       },
   84 |     });
   85 |
   86 |     expect(loginResponse.status()).toBe(200);
   87 |
   88 |     const loginData = await loginResponse.json();
   89 |     expect(loginData.success).toBe(true);
   90 |     expect(loginData.user.email).toBe(TEST_USER.email);
   91 |     expect(loginData.tokens.accessToken).toBeDefined();
   92 |     expect(loginData.tokens.refreshToken).toBeDefined();
   93 |   });
   94 |
   95 |   test('Invalid Login Credentials', async ({ request }) => {
   96 |     const response = await request.post(`${BASE_URL}/api/auth/login`, {
   97 |       data: {
   98 |         email: TEST_USER.email,
   99 |         password: 'wrongpassword',
  100 |       },
  101 |     });
  102 |
  103 |     expect(response.status()).toBe(400);
  104 |
  105 |     const data = await response.json();
  106 |     expect(data.success).toBe(false);
  107 |     expect(data.message).toContain('Invalid email or password');
  108 |   });
  109 |
  110 |   test('Authenticated User Profile Access', async ({ request }) => {
  111 |     // First login to get tokens
  112 |     const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
  113 |       data: {
  114 |         email: TEST_USER.email,
  115 |         password: TEST_USER.password,
  116 |       },
  117 |     });
  118 |
  119 |     const loginData = await loginResponse.json();
  120 |     const { accessToken } = loginData.tokens;
  121 |
  122 |     // Access protected endpoint with token
  123 |     const profileResponse = await request.get(`${BASE_URL}/api/auth/me`, {
  124 |       headers: {
  125 |         Authorization: `Bearer ${accessToken}`,
  126 |       },
  127 |     });
  128 |
  129 |     expect(profileResponse.status()).toBe(200);
  130 |
  131 |     const profileData = await profileResponse.json();
  132 |     expect(profileData.success).toBe(true);
  133 |     expect(profileData.user.email).toBe(TEST_USER.email);
```