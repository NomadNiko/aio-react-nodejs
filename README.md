# AIO React + Node.js with Authentication

A professional business solutions website built with React Boilerplate, featuring a complete authentication system, internationalization (English, Spanish, German), contact form with email integration, and responsive design.

## ✨ Features

- **🔐 Complete Authentication System** - User registration, login, logout, and protected routes
- **👥 User Management** - Admin interface for managing users, roles, and permissions  
- **🌍 Internationalization (i18n)** - Full support for English, Spanish, and German languages with flag icons
- **📧 Contact Form** - Integrated with Resend API for email delivery
- **📱 Responsive Design** - Mobile-first design with hamburger navigation
- **🎨 Professional UI** - Clean, modern design with flag-based language selection
- **⚡ Rate Limiting** - Built-in protection against spam and abuse
- **🔒 Security Features** - JWT tokens, password hashing, session management, account locking
- **⚙️ PM2 Ready** - Production-ready process management configuration
- **🗄️ MongoDB Integration** - Scalable database with user and session management

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or yarn
- **MongoDB** (v4.4 or higher)
- **Git**

### 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/NomadNiko/aio-react-nodejs-auth.git
cd aio-react-nodejs-auth
```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps
```

3. **Install and Configure MongoDB:**

```bash
# Add MongoDB GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list and install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

4. **Set up environment variables:**
```bash
cp ecosystem.config.example.js ecosystem.config.js
```

Edit `ecosystem.config.js` with your configuration:
```javascript
module.exports = {
  apps: [{
    name: 'aio-react-nodejs-auth',
    script: 'server/index.js',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      // Email Configuration (Resend)
      RESEND_API_KEY: 'your-resend-api-key',
      MAIL_FROM: 'noreply@yourdomain.com',
      MAIL_TO: 'admin@yourdomain.com',
      MAIL_DEFAULT_NAME: 'Your Company',
      // Database Configuration
      MONGODB_URI: 'mongodb://localhost:27017/aio-react-nodejs-auth',
      // JWT Configuration
      JWT_SECRET: 'your-super-secret-jwt-key-change-in-production',
      JWT_REFRESH_SECRET: 'your-super-secret-refresh-key-change-in-production',
      ACCESS_TOKEN_EXPIRY: '15m',
      REFRESH_TOKEN_EXPIRY: '7d',
    }
  }]
};
```

5. **Start development server:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

### 🔐 Default Admin Account

Upon first startup, a default admin account is automatically created:

- **Email:** `admin@example.com`
- **Password:** `admin123`

**⚠️ Important:** Change this password immediately in production!

## 🧪 Testing

### Install Playwright (for E2E testing)

```bash
# Install Playwright
npm install --save-dev @playwright/test --legacy-peer-deps

# Install browser binaries
npx playwright install chromium
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run specific browser tests
npx playwright test --project=chromium

# Run tests with UI
npx playwright test --ui

# View test report
npx playwright show-report
```

### Test Coverage

Our test suite includes:
- ✅ **API Health Checks** - Verify all endpoints are responsive
- ✅ **Authentication Flow** - Registration, login, logout, token refresh
- ✅ **User Management** - Profile access, role-based permissions
- ✅ **Security Testing** - Invalid credentials, unauthorized access
- ✅ **Contact Form** - Email functionality testing
- ✅ **UI Components** - Language selector, responsive navigation

## 🏗️ Production Deployment

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
NODE_OPTIONS="--openssl-legacy-provider" pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### Environment Variables for Production

```bash
# Required Production Variables
export NODE_ENV=production
export JWT_SECRET="your-super-secure-production-jwt-secret"
export JWT_REFRESH_SECRET="your-super-secure-production-refresh-secret"
export MONGODB_URI="mongodb://localhost:27017/your-production-db"
export RESEND_API_KEY="your-production-resend-key"
export MAIL_FROM="noreply@yourdomain.com"
export MAIL_TO="admin@yourdomain.com"
```

## 🔧 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | User registration | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/logout` | User logout | ✅ |
| `POST` | `/api/auth/refresh` | Refresh JWT tokens | ❌ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### User Management Endpoints (Admin Only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users` | List all users (with pagination) | ✅ Admin |
| `POST` | `/api/users` | Create new user | ✅ Admin |
| `GET` | `/api/users/:id` | Get user by ID | ✅ Admin |
| `PUT` | `/api/users/:id` | Update user | ✅ Admin |
| `DELETE` | `/api/users/:id` | Deactivate user | ✅ Admin |
| `POST` | `/api/users/:id/reset-password` | Reset user password | ✅ Admin |
| `POST` | `/api/users/:id/unlock` | Unlock user account | ✅ Admin |
| `GET` | `/api/users/admin/stats` | Get user statistics | ✅ Admin |

### Other Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/contact` | Send contact form | ❌ |
| `GET` | `/api/health` | Health check | ❌ |

## 🛡️ Security Features

### Authentication & Authorization
- **JWT Tokens** - Secure access and refresh token system
- **Role-Based Access Control** - Admin and user roles with proper permissions
- **Session Management** - Database-stored sessions with unique identifiers
- **Account Locking** - Automatic account locking after failed login attempts

### Security Middleware
- **Rate Limiting** - Configurable limits for different endpoints
- **CORS Protection** - Proper cross-origin resource sharing configuration
- **Helmet Security** - Security headers and CSP policies
- **Password Security** - BCrypt hashing with 12 rounds

### Security Configuration
- **Login Attempts** - 5 failed attempts result in 2-hour account lock
- **Token Expiry** - Access tokens expire in 15 minutes, refresh tokens in 7 days
- **Environment Secrets** - All sensitive data stored in environment variables

## 🌍 Internationalization

The application supports three languages with flag-based selection:

- **🇺🇸 English** - Default language
- **🇪🇸 Spanish** - Full translation support
- **🇩🇪 German** - Full translation support

### Language Files
- `app/translations/en.json` - English translations
- `app/translations/es.json` - Spanish translations  
- `app/translations/de.json` - German translations

### Adding New Languages
1. Create new translation file in `app/translations/`
2. Add language to `app/i18n.js`
3. Add flag icon to `app/images/`
4. Update language selector component

## 📱 Mobile Responsiveness

- **Desktop Navigation** - Full horizontal navigation with language flags
- **Mobile Navigation** - Hamburger menu with slide-out navigation
- **Flag Icons** - Desktop shows flags inline, mobile shows in hamburger menu
- **Responsive Breakpoint** - 768px for mobile/desktop switch

## 🗂️ Project Structure

```
├── app/                    # React application
│   ├── components/        # Reusable UI components
│   │   ├── LanguageSelector/  # Flag-based language switcher
│   │   └── Navigation/        # Responsive navigation
│   ├── containers/        # Page components and providers
│   │   ├── AuthProvider/      # Authentication state management
│   │   ├── HomePage/          # Landing page
│   │   ├── ContactPage/       # Contact form
│   │   └── ...
│   ├── images/           # Static assets (including flag icons)
│   └── translations/     # i18n language files
├── server/               # Express.js backend
│   ├── api/             # API routes
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── users.js         # User management (admin)
│   │   └── contact.js       # Contact form
│   ├── config/          # Configuration files
│   │   └── database.js      # MongoDB connection
│   ├── middleware/      # Express middlewares
│   │   └── auth.js          # JWT authentication middleware
│   └── models/          # Database models
│       ├── User.js          # User schema and methods
│       └── Session.js       # Session management
├── tests/               # Playwright E2E tests
├── internals/           # Build and development tools
└── docs/               # Documentation
```

## 📊 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run Jest test suite
- `npm run lint` - Run ESLint
- `npm run extract-intl` - Extract translation strings
- `npx playwright test` - Run E2E tests

## 🔧 Technologies Used

### Frontend
- **React** 16.8.6 - UI library
- **Redux** + **Redux-Saga** - State management
- **styled-components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **React Intl** - Internationalization

### Backend  
- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **BCrypt** - Password hashing
- **Helmet** - Security middleware
- **Rate Limiting** - Request throttling

### Development & Testing
- **Webpack** - Module bundler
- **Babel** - JavaScript compilation
- **ESLint** + **Prettier** - Code quality
- **Playwright** - E2E testing
- **PM2** - Process management

## 🤝 Contributing

This project is ready for authentication system enhancement. Contribute by:

1. **Database Layer** - Additional models and relationships
2. **Authentication APIs** - Enhanced features (2FA, social auth)
3. **Frontend Components** - Login/register forms, admin dashboard
4. **Testing** - Unit tests and additional E2E coverage
5. **Security** - Additional security measures and audit

## 📝 Development Roadmap

### ✅ Completed
- [x] MongoDB integration with User and Session models
- [x] Complete authentication API (register, login, logout, refresh)
- [x] JWT token management with secure sessions
- [x] Admin user management API with full CRUD operations
- [x] Role-based access control (admin/user)
- [x] Security features (rate limiting, account locking, password hashing)
- [x] Playwright testing suite with API and UI tests
- [x] Flag-based language selector with responsive design

### 🚧 In Progress / Next Steps
- [ ] Frontend authentication components (login/register forms)
- [ ] Admin dashboard for user management
- [ ] Password reset functionality via email
- [ ] Email verification for new accounts
- [ ] Social media authentication (Google, GitHub)
- [ ] Enhanced user profiles with avatar uploads
- [ ] Audit logging for admin actions
- [ ] Two-factor authentication (2FA)

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check MongoDB logs
sudo journalctl -u mongod
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### PM2 Issues
```bash
# Check PM2 processes
pm2 status

# View logs
pm2 logs aio-react-nodejs-auth

# Restart application
pm2 restart aio-react-nodejs-auth
```

## 📄 License

MIT License - see LICENSE.md for details

## 🌟 Acknowledgments

- Built on [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- Authentication architecture inspired by enterprise-grade security practices
- UI/UX design following modern web standards
- Mobile-first responsive design principles

---

**🚀 Ready for Production** - This application includes enterprise-grade authentication, security features, and comprehensive testing. Perfect foundation for building scalable web applications with user management capabilities.