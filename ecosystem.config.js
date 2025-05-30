module.exports = {
  apps: [
    {
      name: 'business-solutions-site',
      script: 'npm',
      args: 'start',
      cwd: '/var/www2',
      env: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--openssl-legacy-provider',
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--openssl-legacy-provider',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};
