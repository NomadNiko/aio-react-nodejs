module.exports = {
  apps: [
    {
      name: 'aio-react-nodejs',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--openssl-legacy-provider',
        PORT: 3000,
        // Add your environment variables here
        RESEND_API_KEY: 'your_resend_api_key_here',
        MAIL_FROM: 'noreply@yourdomain.com',
        MAIL_TO: 'support@yourdomain.com',
        MAIL_DEFAULT_NAME: 'Your Company Name',
        RATE_LIMIT_WINDOW_MS: 900000,
        RATE_LIMIT_MAX_REQUESTS: 5,
        ENABLE_DYNAMIC_LOADING: true,
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--openssl-legacy-provider',
        PORT: 3000,
        // Add your production environment variables here
        RESEND_API_KEY: 'your_production_resend_api_key_here',
        MAIL_FROM: 'noreply@yourdomain.com',
        MAIL_TO: 'support@yourdomain.com',
        MAIL_DEFAULT_NAME: 'Your Company Name',
        RATE_LIMIT_WINDOW_MS: 900000,
        RATE_LIMIT_MAX_REQUESTS: 5,
        ENABLE_DYNAMIC_LOADING: true,
      },
    },
  ],
};
