# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm
- PM2 (for production)

## Setup Steps

1. **Clone the repository:**
```bash
git clone https://github.com/NomadNiko/aio-react-nodejs.git
cd aio-react-nodejs
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

3. **Environment Configuration:**
```bash
cp .env.example .env
```
Edit `.env` with your actual values:
- `RESEND_API_KEY`: Your Resend API key
- `MAIL_FROM`: Your sending email address
- `MAIL_TO`: Email address to receive contact form submissions
- `MAIL_DEFAULT_NAME`: Your company name

4. **PM2 Configuration (Production):**
```bash
cp ecosystem.config.example.js ecosystem.config.js
```
Edit `ecosystem.config.js` with your environment variables.

5. **Development:**
```bash
npm start
```

6. **Production with PM2:**
```bash
npm run build
pm2 start ecosystem.config.js
```

## Features Included

✅ **Internationalization (i18n)** - English, Spanish, German
✅ **Contact Form** - Email integration with Resend
✅ **Responsive Design** - Mobile hamburger navigation  
✅ **Professional Pages** - Home, Services, Results, Contact
✅ **Email Functionality** - Customer confirmations + admin notifications
✅ **Rate Limiting** - Spam protection
✅ **PM2 Ready** - Production deployment configuration

## Support
- Repository: https://github.com/NomadNiko/aio-react-nodejs
- Issues: https://github.com/NomadNiko/aio-react-nodejs/issues