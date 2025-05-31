/**
 * Dynamic preloader service for silently loading site data
 */

class PreloaderService {
  constructor() {
    this.isEnabled = process.env.ENABLE_DYNAMIC_LOADING === 'true';
    this.preloadQueue = new Set();
    this.preloadedData = new Map();
    this.isPreloading = false;
  }

  /**
   * Start preloading all site data silently
   */
  async preloadSiteData() {
    if (!this.isEnabled || this.isPreloading) {
      return;
    }

    this.isPreloading = true;

    try {
      // Preload translation data for all languages
      await this.preloadTranslations();

      // Preload any API data that's commonly used
      await this.preloadApiData();

      // Preload component assets
      await this.preloadComponents();
    } catch (error) {
      console.warn('Preloader: Some data failed to preload silently:', error);
    } finally {
      this.isPreloading = false;
    }
  }

  /**
   * Preload translation files for all languages
   */
  async preloadTranslations() {
    try {
      // Import translation files that are bundled with the app
      const [
        enTranslations,
        deTranslations,
        esTranslations,
      ] = await Promise.allSettled([
        import('../translations/en.json'),
        import('../translations/de.json'),
        import('../translations/es.json'),
      ]);

      if (enTranslations.status === 'fulfilled') {
        this.preloadedData.set(
          'translations-en',
          enTranslations.value.default || enTranslations.value,
        );
      }
      if (deTranslations.status === 'fulfilled') {
        this.preloadedData.set(
          'translations-de',
          deTranslations.value.default || deTranslations.value,
        );
      }
      if (esTranslations.status === 'fulfilled') {
        this.preloadedData.set(
          'translations-es',
          esTranslations.value.default || esTranslations.value,
        );
      }
    } catch (error) {
      console.warn('Preloader: Failed to load translation files:', error);
    }
  }

  /**
   * Preload common API data that pages will need
   */
  async preloadApiData() {
    // Basic health check
    const basicEndpoints = ['/api/health'];

    const basicPromises = basicEndpoints.map(async endpoint => {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          this.preloadedData.set(`api-${endpoint}`, data);
        }
      } catch (error) {
        console.warn(
          `Preloader: Failed to load API data from ${endpoint}:`,
          error,
        );
      }
    });

    await Promise.allSettled(basicPromises);

    // Preload authenticated data if user is logged in
    await this.preloadAuthenticatedData();
  }

  /**
   * Preload data that requires authentication
   */
  async preloadAuthenticatedData() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return; // No auth token, skip authenticated endpoints
    }

    const authenticatedEndpoints = [
      { url: '/api/users?page=1', key: 'users-page-1' },
      { url: '/api/users?page=1&search=', key: 'users-search-empty' },
    ];

    const authPromises = authenticatedEndpoints.map(async ({ url, key }) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.preloadedData.set(`api-${key}`, data);
        }
      } catch (error) {
        console.warn(`Preloader: Failed to load ${url}:`, error);
      }
    });

    await Promise.allSettled(authPromises);
  }

  /**
   * Preload component chunks that are likely to be used
   */
  async preloadComponents() {
    // List of components that should be preloaded
    const componentPromises = [
      // Preload commonly used page components
      import('../containers/HomePage/Loadable'),
      import('../containers/ContactPage/Loadable'),
      import('../containers/ServicesPage/Loadable'),
      import('../containers/ResultsPage/Loadable'),
      import('../components/Navigation/Loadable'),
      import('../components/LanguageSelector/Loadable'),
    ].map(promise =>
      promise.catch(error => {
        console.warn('Preloader: Failed to preload component:', error);
        return null;
      }),
    );

    await Promise.allSettled(componentPromises);
  }

  /**
   * Get preloaded data if available
   */
  getPreloadedData(key) {
    return this.preloadedData.get(key);
  }

  /**
   * Get preloaded API data with fallback to fetch if not cached
   */
  async getApiData(url, options = {}) {
    const cacheKey = `api-${url.replace(/[^a-zA-Z0-9]/g, '-')}`;

    // Return cached data if available
    const cached = this.preloadedData.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Fallback to regular fetch if not cached
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        // Cache the result for future use
        this.preloadedData.set(cacheKey, data);
        return data;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get cached users data for admin page
   */
  getCachedUsers(page = 1, search = '') {
    const searchKey = search ? `users-search-${search}` : 'users-search-empty';
    const pageKey = `users-page-${page}`;

    // Try exact match first
    let cached =
      this.preloadedData.get(`api-${pageKey}`) ||
      this.preloadedData.get(`api-${searchKey}`);

    // If no exact match and it's page 1 with no search, try the general cached data
    if (!cached && page === 1 && !search) {
      cached =
        this.preloadedData.get('api-users-page-1') ||
        this.preloadedData.get('api-users-search-empty');
    }

    return cached;
  }

  /**
   * Check if specific data is cached
   */
  isCached(key) {
    return this.preloadedData.has(key);
  }

  /**
   * Force refresh of cached data
   */
  clearCache() {
    this.preloadedData.clear();
  }

  /**
   * Check if preloading is enabled
   */
  isPreloadingEnabled() {
    return this.isEnabled;
  }

  /**
   * Add a URL to the preload queue for future loading
   */
  queueForPreload(url) {
    if (this.isEnabled) {
      this.preloadQueue.add(url);
    }
  }

  /**
   * Process the preload queue
   */
  async processPreloadQueue() {
    if (!this.isEnabled || this.preloadQueue.size === 0) {
      return;
    }

    const promises = Array.from(this.preloadQueue).map(async url => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.preloadedData.set(url, data);
        }
      } catch (error) {
        console.warn(`Preloader: Failed to preload ${url}:`, error);
      }
    });

    await Promise.allSettled(promises);
    this.preloadQueue.clear();
  }
}

// Create singleton instance
const preloaderService = new PreloaderService();

export default preloaderService;
