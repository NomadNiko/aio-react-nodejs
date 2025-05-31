const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_USER = {
  email: 'playwright@example.com',
  password: 'test123456',
  firstName: 'Playwright',
  lastName: 'User',
};

test.describe('Authentication System', () => {
  test.beforeAll(async ({ request }) => {
    // Clean up any existing test user
    await request.post(`${BASE_URL}/api/auth/logout`).catch(() => {});
  });

  test('should load the main application', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/React.js Boilerplate/);

    // Check if the app has loaded properly
    await expect(page.locator('#app')).toBeVisible();

    // Should see navigation with language flags
    await expect(page.locator('nav')).toBeVisible();

    // Should see language flags
    await expect(
      page.locator(
        'img[alt*="English"], img[alt*="Español"], img[alt*="Deutsch"]',
      ),
    ).toHaveCount(3);
  });

  test('API Health Check', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe('OK');
    expect(data.timestamp).toBeDefined();
  });

  test('Authentication endpoints without token should fail', async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/api/auth/me`);
    expect(response.status()).toBe(401);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toContain('token');
  });

  test('User Registration Flow', async ({ request }) => {
    // Register new user
    const registerResponse = await request.post(
      `${BASE_URL}/api/auth/register`,
      {
        data: TEST_USER,
      },
    );

    expect(registerResponse.status()).toBe(201);

    const registerData = await registerResponse.json();
    expect(registerData.success).toBe(true);
    expect(registerData.user.email).toBe(TEST_USER.email);
    expect(registerData.user.firstName).toBe(TEST_USER.firstName);
    expect(registerData.user.lastName).toBe(TEST_USER.lastName);
    expect(registerData.user.role).toBe('user');
    expect(registerData.tokens.accessToken).toBeDefined();
    expect(registerData.tokens.refreshToken).toBeDefined();
  });

  test('User Login Flow', async ({ request }) => {
    // Login with the registered user
    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: TEST_USER.email,
        password: TEST_USER.password,
      },
    });

    expect(loginResponse.status()).toBe(200);

    const loginData = await loginResponse.json();
    expect(loginData.success).toBe(true);
    expect(loginData.user.email).toBe(TEST_USER.email);
    expect(loginData.tokens.accessToken).toBeDefined();
    expect(loginData.tokens.refreshToken).toBeDefined();
  });

  test('Invalid Login Credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: TEST_USER.email,
        password: 'wrongpassword',
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toContain('Invalid email or password');
  });

  test('Authenticated User Profile Access', async ({ request }) => {
    // First login to get tokens
    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: TEST_USER.email,
        password: TEST_USER.password,
      },
    });

    const loginData = await loginResponse.json();
    const { accessToken } = loginData.tokens;

    // Access protected endpoint with token
    const profileResponse = await request.get(`${BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(profileResponse.status()).toBe(200);

    const profileData = await profileResponse.json();
    expect(profileData.success).toBe(true);
    expect(profileData.user.email).toBe(TEST_USER.email);
    expect(profileData.user.firstName).toBe(TEST_USER.firstName);
  });

  test('Token Refresh Flow', async ({ request }) => {
    // Login to get tokens
    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: TEST_USER.email,
        password: TEST_USER.password,
      },
    });

    const loginData = await loginResponse.json();
    const { refreshToken } = loginData.tokens;

    // Refresh the token
    const refreshResponse = await request.post(`${BASE_URL}/api/auth/refresh`, {
      data: {
        refreshToken,
      },
    });

    expect(refreshResponse.status()).toBe(200);

    const refreshData = await refreshResponse.json();
    expect(refreshData.success).toBe(true);
    expect(refreshData.tokens.accessToken).toBeDefined();
    expect(refreshData.tokens.refreshToken).toBeDefined();
    // Tokens should be different from original
    expect(refreshData.tokens.accessToken).not.toBe(
      loginData.tokens.accessToken,
    );
  });

  test('Admin User Management Access', async ({ request }) => {
    // Try to access admin endpoints as regular user
    const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: TEST_USER.email,
        password: TEST_USER.password,
      },
    });

    const loginData = await loginResponse.json();
    const { accessToken } = loginData.tokens;

    // Try to access admin-only endpoint
    const usersResponse = await request.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(usersResponse.status()).toBe(403);

    const usersData = await usersResponse.json();
    expect(usersData.success).toBe(false);
    expect(usersData.message).toContain('permissions');
  });

  test('Contact Form API', async ({ request }) => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from Playwright',
    };

    const response = await request.post(`${BASE_URL}/api/contact`, {
      data: contactData,
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain('sent successfully');
  });

  test('Language Selector Functionality', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if language flags are present
    const flags = page.locator('button img[src*="flag-"]');
    await expect(flags).toHaveCount(3);

    // Check if flags are clickable
    const usFlag = page.locator('button img[src*="flag-us"]').first();
    await expect(usFlag).toBeVisible();

    const esFlag = page.locator('button img[src*="flag-es"]').first();
    await expect(esFlag).toBeVisible();

    const deFlag = page.locator('button img[src*="flag-de"]').first();
    await expect(deFlag).toBeVisible();

    // Test clicking language flags (should not cause errors)
    await esFlag.click();
    await usFlag.click();
  });

  test('Responsive Navigation', async ({ page }) => {
    // Test desktop navigation
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });

    // Should see full navigation menu
    await expect(page.locator('nav ul')).toBeVisible();

    // Test mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });

    // Should see hamburger menu
    await expect(page.locator('button[aria-expanded]')).toBeVisible();

    // Click hamburger menu
    const hamburger = page
      .locator('button')
      .filter({ hasText: /menu|☰/ })
      .or(
        page
          .locator('button:has(span)')
          .filter({ hasNotText: /\w/ })
          .first(),
      );

    if ((await hamburger.count()) > 0) {
      await hamburger.click();

      // Mobile menu should appear
      await expect(page.locator('nav ul')).toBeVisible();
    }
  });

  test.afterAll(async ({ request }) => {
    // Clean up test user
    try {
      const loginResponse = await request.post(`${BASE_URL}/api/auth/login`, {
        data: {
          email: TEST_USER.email,
          password: TEST_USER.password,
        },
      });

      if (loginResponse.ok()) {
        await request.post(`${BASE_URL}/api/auth/logout`);
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  });
});
