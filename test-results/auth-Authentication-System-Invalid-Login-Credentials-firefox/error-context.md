# Test info

- Name: Authentication System >> Invalid Login Credentials
- Location: /var/www2/tests/auth.spec.js:95:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 429
    at /var/www2/tests/auth.spec.js:103:31
```

# Test source

```ts
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
   33 |     ).toHaveCount(3);
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
> 103 |     expect(response.status()).toBe(400);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
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
  134 |     expect(profileData.user.firstName).toBe(TEST_USER.firstName);
  135 |   });
  136 |
  137 |   test('Token Refresh Flow', async ({ request }) => {
  138 |     // Login to get tokens
  139 |     const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
  140 |       data: {
  141 |         email: TEST_USER.email,
  142 |         password: TEST_USER.password,
  143 |       },
  144 |     });
  145 |
  146 |     const loginData = await loginResponse.json();
  147 |     const { refreshToken } = loginData.tokens;
  148 |
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
```