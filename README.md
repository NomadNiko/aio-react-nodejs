# AIO React + Node.js with Authentication

A professional business solutions website built with React Boilerplate, featuring authentication system, internationalization (English, Spanish, German), contact form with email integration, and responsive design.

## Features

- **Modern React Application** - Built on React Boilerplate with Redux, Redux-Saga, and React Router
- **Authentication System** - User registration, login, logout, and protected routes
- **Internationalization (i18n)** - Full support for English, Spanish, and German languages with flag icons
- **Contact Form** - Integrated with Resend API for email delivery
- **Responsive Design** - Mobile-first design with hamburger navigation
- **Professional UI** - Clean, modern design with stock imagery
- **Email Functionality** - Automatic customer confirmation emails and admin notifications
- **Rate Limiting** - Built-in protection against spam submissions
- **PM2 Ready** - Production-ready process management configuration
- **Database Ready** - Prepared for database integration (MongoDB, PostgreSQL, etc.)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Database (optional - will be configured during development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NomadNiko/aio-react-nodejs-auth.git
cd aio-react-nodejs-auth
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp ecosystem.config.example.js ecosystem.config.js
```

Edit `ecosystem.config.js` with your configuration:
- Email settings (Resend API)
- Database connection (to be added)
- Authentication secrets (to be added)

4. Start development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Development Roadmap

This repository is prepared for authentication system development. The following features will be added:

### Phase 1: Database Setup
- [ ] Database configuration (MongoDB/PostgreSQL)
- [ ] User model and schema
- [ ] Database connection and migrations

### Phase 2: Authentication Backend
- [ ] User registration API
- [ ] User login/logout API
- [ ] JWT token management
- [ ] Password hashing and validation
- [ ] Email verification system

### Phase 3: Frontend Authentication
- [ ] Login/Register components
- [ ] Protected route wrapper
- [ ] User session management
- [ ] Profile management page
- [ ] Authentication state in Redux

### Phase 4: Enhanced Features
- [ ] Password reset functionality
- [ ] Social media authentication
- [ ] Role-based access control
- [ ] User dashboard

## Project Structure

```
├── app/                    # React application
│   ├── components/        # Reusable UI components
│   ├── containers/        # Page components
│   ├── images/           # Static assets (including flag icons)
│   └── translations/     # i18n language files
├── server/               # Express.js backend
│   ├── api/             # API routes
│   └── middlewares/     # Express middlewares
├── internals/           # Build and development tools
└── docs/               # Documentation
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run extract-intl` - Extract translation strings

## Technologies Used

- **Frontend**: React, Redux, Redux-Saga, styled-components, React Router
- **Backend**: Node.js, Express.js
- **Build Tools**: Webpack, Babel, ESLint, Prettier
- **Email**: Resend API
- **Internationalization**: react-intl
- **Process Management**: PM2

## Contributing

This project is ready for authentication system development. Feel free to contribute by:

1. Setting up the database layer
2. Implementing authentication APIs
3. Creating authentication UI components
4. Adding tests for authentication features

## License

MIT License - see LICENSE.md for details

## Original Base

This project is based on the aio-react-nodejs boilerplate, enhanced with flag-based language selection and prepared for authentication system integration.