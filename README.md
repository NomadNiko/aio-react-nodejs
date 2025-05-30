# AIO React + Node.js Business Website

A professional business solutions website built with React Boilerplate, featuring internationalization (English, Spanish, German), contact form with email integration, and responsive design.

## Features

- **Modern React Application** - Built on React Boilerplate with Redux, Redux-Saga, and React Router
- **Internationalization (i18n)** - Full support for English, Spanish, and German languages
- **Contact Form** - Integrated with Resend API for email delivery
- **Responsive Design** - Mobile-first design with hamburger navigation
- **Professional UI** - Clean, modern design with stock imagery
- **Email Functionality** - Automatic customer confirmation emails and admin notifications
- **Rate Limiting** - Built-in protection against spam submissions
- **PM2 Ready** - Production-ready process management configuration

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PM2 (for production deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NomadNiko/aio-react-nodejs.git
cd aio-react-nodejs
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Configure PM2 (for production):
```bash
cp ecosystem.config.example.js ecosystem.config.js
# Edit ecosystem.config.js with your actual values
```

### Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start with PM2:
```bash
pm2 start ecosystem.config.js
```

3. Monitor the application:
```bash
pm2 logs aio-react-nodejs
pm2 status
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Environment
NODE_ENV=development
PORT=3000

# Email Configuration (Resend API)
RESEND_API_KEY=your_resend_api_key_here
MAIL_FROM=noreply@yourdomain.com
MAIL_TO=support@yourdomain.com
MAIL_DEFAULT_NAME=Your Company Name

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### Email Setup

This application uses [Resend](https://resend.com) for email delivery:

1. Sign up for a Resend account
2. Get your API key from the dashboard
3. Configure your domain for sending (optional but recommended)
4. Update the environment variables with your API key and email addresses

### Internationalization

The application supports three languages:
- **English (en)** - Default language
- **Spanish (es)** - Full translation
- **German (de)** - Full translation

To add a new language:
1. Run the language generator: `npm run generate`
2. Select "Language" and follow the prompts
3. Update the translation files in `app/translations/`

## Project Structure

```
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Navigation/      # Main navigation with language selector
│   │   └── LanguageSelector/ # Language switching component
│   ├── containers/          # Page-level components
│   │   ├── HomePage/        # Landing page
│   │   ├── ServicesPage/    # Services overview
│   │   ├── ResultsPage/     # Case studies and testimonials
│   │   └── ContactPage/     # Contact form and information
│   ├── translations/        # i18n translation files
│   │   ├── en.json         # English translations
│   │   ├── es.json         # Spanish translations
│   │   └── de.json         # German translations
│   └── utils/              # Utility functions and configurations
├── server/
│   └── api/
│       └── contact.js      # Contact form API endpoint
├── internals/              # Build tools and configurations
└── docs/                   # Documentation
```

## API Endpoints

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Run code generators (components, containers, languages)
- `npm run extract-intl` - Extract messages for translation
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run prettify` - Format code with Prettier

## Deployment

### Using PM2

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Configure your ecosystem file:
```bash
cp ecosystem.config.example.js ecosystem.config.js
```

3. Start the application:
```bash
pm2 start ecosystem.config.js
```

4. Setup PM2 startup (optional):
```bash
pm2 startup
pm2 save
```

### Using Docker

Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t aio-react-nodejs .
docker run -p 3000:3000 aio-react-nodejs
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run the linter and tests
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: support@nomadsoft.us
- Issues: [GitHub Issues](https://github.com/NomadNiko/aio-react-nodejs/issues)

## Acknowledgments

- Built with [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- Email delivery by [Resend](https://resend.com)
- Images from [Unsplash](https://unsplash.com)