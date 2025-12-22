# Flip Mather - Full-Stack Web Application

> A professional, production-ready web platform showcasing modern web development practices with complete authentication, payment processing, and dynamic content management.

## 🌟 Overview

**Flip Mather** is a full-stack web application built for Durban's popular YouTuber. It serves as a hub for community engagement, sponsorship opportunities, and personalized professional pages. The platform demonstrates enterprise-grade architecture with a focus on security, scalability, and user experience.

**Live Demo:** [flipmather.co.za](https://flipmather.co.za)

---

## 📋 Key Features

### 🔐 **Complete Authentication System**
- **User Registration & Sign-Up** with comprehensive validation
  - Email verification via OTP (One-Time Password)
  - Phone number validation (E.164 format)
  - Strong password requirements (10+ chars, uppercase, lowercase, digit, symbol)
  - Marketing opt-in consent management
- **Secure Login** with:
  - Rate limiting to prevent brute force attacks
  - Account lockout after 5 failed attempts (15-minute cooldown)
  - Session hardening and cookie security
  - Password hashing with PHP's `password_hash()` (bcrypt)
  - Login attempt tracking and audit logging
- **Role-Based Access Control (RBAC)**
  - Admin dashboard with protected routes
  - User-specific content visibility
  - Conditional rendering based on permissions
- **Password Recovery**
  - Secure OTP-based password reset
  - Email verification for reset requests
  - Time-limited reset tokens

### 💌 **Email Integration (Resend API)**
- Automated email sending via [Resend](https://resend.com)
- Email notifications for:
  - OTP verification codes
  - Password reset codes
  - Account notifications
- Production-ready error handling and retry logic

### 💳 **PayFast Payment Integration**
- Full payment processing workflow for sponsorships
- Secure signature generation (MD5 validation)
- PayFast Instant Transaction Notification (ITN) webhook handling
- Payment status tracking and database persistence
- Amount validation to prevent fraud
- Production and sandbox environment support
- Automatic payment status updates in real-time

### 👥 **User Management & Profiles**
- User account creation with complete data capture
- Profile management and updates
- Admin panel for user management
- User soft-delete functionality (data preservation)
- Account activity tracking (login times, attempt counts)
- Email verification status management

### 🎯 **Professional E-Business Cards**
Two interactive, fully-responsive pages showcasing professionals:

#### **Mackie's Coaching Profile** (`/mackie`)
- Personal trainer services page
- Interactive tools:
  - **BMI Calculator** - Real-time body mass index calculation
  - **TDEE & Macros Calculator** - Mifflin-St Jeor basal metabolic rate with macro breakdowns
  - **1RM Estimator** - Epley formula for estimated one-rep max calculations
- Client testimonials carousel
- Service packages with pricing (in-person, online, group coaching)
- Contact information and booking system
- downloadable vCard (contact card)
- Responsive design for all devices
- Professional styling with consistent branding

#### **Eric's Professional Profile** (`/eric`)
- Customizable professional showcase
- Career highlights and credentials
- Contact information
- Call-to-action for engagement

### 📊 **Admin Dashboard**
- **User Management Panel** (`/admin/users`)
  - View all registered users
  - User activity metrics
  - Conditional rendering for admin-only access
- **Sponsorship Management** (`/admin/sponsors`)
  - View all sponsorships and donations
  - Payment status tracking
  - Revenue analytics
  - Export capabilities for reporting

### 🎁 **Sponsorship & Giveaway System**
- **Sponsor a Vlog** page with:
  - Flexible donation amounts (minimum R50)
  - Sponsor name and message capture
  - PayFast payment gateway integration
  - Real-time payment status
  - Thank you page confirmation
- **Giveaway Sign-Up Card**
  - Quick entry mechanism
  - Email capture for marketing
  - Newsletter integration

### 🔍 **SEO & Analytics**
- **Google Analytics 4 Integration**
  - Page view tracking
  - User behavior analytics
  - Conversion tracking
  - Custom event logging
- **Google Search Console Optimization**
  - Meta tags for improved search visibility
  - Sitemap generation
  - Robots.txt configuration
  - Canonical URL tags
- **Open Graph Meta Tags**
  - Social media preview optimization
  - Custom title and description tags
  - Share image optimization

### 🎨 **Custom Error Pages**
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Permission denied
- **404 Not Found** - Resource not available
- **500 Internal Server Error** - Server-side error handling
- Professional, branded error pages with navigation guidance
- Located in project root directory

### 🌓 **Dark Mode Support**
- System preference detection (`prefers-color-scheme`)
- Persistent user preference
- Smooth theme transitions
- Complete CSS variable theming system
- Accessibility-focused color schemes

---

## 🏗️ Technical Architecture

### **Frontend Stack**
```
React 19.x
├── React Router v7 (client-side routing)
├── Framer Motion (animations)
├── Three.js (3D graphics - ballpit effect)
├── Lucide React (icon library)
├── Motion/Framer Motion (smooth transitions)
└── React Phone Number Input (E.164 validation)
```

**Build Tools:**
- Vite (lightning-fast build & dev server)
- ESLint (code quality)
- Modern JavaScript (ES2020+)

### **Backend Stack**
```
PHP 7.4+ (due to shared hosting constraints)
├── PDO Database Abstraction Layer
├── Prepared Statements (SQL injection prevention)
├── PayFast API Integration
├── Resend Email API
└── Session Management (hardened cookies)
```

**Architecture Pattern:**
- Router-based request dispatch (`/api/index.php`)
- Modular endpoint files (separation of concerns)
- Error handling with logging
- Rate limiting and security middleware

### **Database**
- MySQL 5.7+
- Normalized schema for users, sponsorships, and tracking
- Soft-delete pattern for data preservation
- Indexed queries for performance
- Email verification state management
- Payment tracking and audit logs

### **API Design**
RESTful API with proper HTTP methods:
- `POST /api/login` - User authentication
- `POST /api/users` - User registration
- `POST /api/verify-email` - Email verification
- `POST /api/forgot-password` - Password recovery
- `POST /api/reset-password` - Password reset
- `GET /api/me` - Current user profile
- `POST /api/generate-payfast` - Payment initialization
- `POST /api/payfast-notify` - Payment webhook
- `GET /api/admin-get-users` - Admin user list
- `GET /api/admin-get-sponsors` - Admin sponsorship list

---

## 📁 Project Structure

```
FlipMatherPublicWebsite/
├── src/                         # React application
│   ├── Accounts/                # Authentication flows (Login, SignUp, VerifyEmail, PasswordReset)
│   ├── AdminPages/              # Admin dashboard (AdminUsers, AdminSponsors)
│   ├── Home/                    # Landing page with Cards
│   ├── OtherPages/              # Professional pages (Trainer, Advisor, Sponsor, ThankYou)
│   ├── components/              # Reusable UI components
│   ├── hooks/                   # Custom React hooks (useAuth, useApi, useDarkMode, useResponsive)
│   ├── Utils/                   # Validation helpers
│   └── assets/                  # Static images and logos
│
├── api/                         # Backend PHP
│   ├── index.php                # Main router (handles all requests)
│   ├── db.php                   # Database connection (PDO)
│   ├── helpers.php              # Utility functions
│   ├── send_resend.php          # Email service integration
│   ├── *_user.php               # User endpoints (login, signup, profile, etc)
│   ├── *_password.php           # Password recovery endpoints
│   ├── *payfast*.php            # Payment integration endpoints
│   ├── admin_*.php              # Admin endpoints
│   ├── logs/                    # PHP error logs
│   └── vendor/                  # Composer dependencies
│
├── public/                      # Static assets
├── 401.html, 403.html, 404.html, 500.html  # Custom error pages (root level)
├── package.json                 # Node.js dependencies
├── vite.config.js               # Vite build configuration
└── README2.md                   # This file
```

---

## 🔒 Security Features

### Authentication & Authorization
- ✅ **Session Hardening** - HTTP-only, Secure, SameSite cookies
- ✅ **Password Hashing** - bcrypt via `password_hash()`
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **Account Lockout** - Automatic lockout after failed attempts
- ✅ **Email Verification** - OTP-based email confirmation
- ✅ **CORS Protection** - Restricted to allowed origins
- ✅ **CSRF Tokens** - X-CSRF-Token header validation

### Data Protection
- ✅ **Prepared Statements** - SQL injection prevention
- ✅ **Input Validation** - All inputs validated and sanitized
- ✅ **Phone Number Validation** - E.164 format enforcement
- ✅ **Email Normalization** - Case-insensitive email handling
- ✅ **Soft Deletes** - Data preservation for compliance

### Payment Security
- ✅ **PayFast Signature Validation** - MD5-based request verification
- ✅ **Amount Validation** - Prevents tampering with payment amounts
- ✅ **IP Whitelisting** - PayFast IP range validation
- ✅ **ITN Webhook Security** - Secure notification handling

### API Security
- ✅ **Error Logging** - Comprehensive error tracking without exposure
- ✅ **Payload Size Limits** - 1MB request limit enforcement
- ✅ **Graceful Error Handling** - No stack traces exposed to clients
- ✅ **Automatic Log Rotation** - Clean error management

---

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting** - Lazy-loaded routes with React.lazy() and Suspense
- **CSS Variables** - Single-source-of-truth for theming
- **Responsive Images** - Picture elements for device-optimized assets
- **Motion Optimization** - GPU-accelerated animations
- **Tree Shaking** - Unused code elimination in production builds

### Backend
- **Database Indexing** - Query optimization on frequently accessed fields
- **Prepared Statements** - Compiled query plans for repeated queries
- **Session Caching** - Minimal database hits for auth
- **Rate Limiting** - Temporary file-based request tracking
- **Error Logging** - Async error capture without performance impact

---

## 📱 Responsive Design

- **Mobile-First Approach** - Optimized for small screens first
- **Breakpoints** - Adaptive layouts at 1024px threshold
- **Touch-Friendly** - Buttons and inputs sized for mobile interaction
- **Viewport Meta Tags** - Proper scaling for all devices
- **Flexible Grid** - CSS Grid and Flexbox for responsive layouts

---

## 🎨 Design System

### Glassmorphism UI
- Frosted glass effect with backdrop blur
- Semi-transparent layers for depth
- Consistent border and shadow treatments
- Light and dark mode variants

### Color Palette
- **Primary:** Red (#ce2c2c) for CTAs
- **Accent:** Green (#16a34a) for professional pages
- **Neutral:** Gray scale for text and backgrounds
- **Theme:** CSS variable system for easy customization

### Typography
- System font stack for optimal rendering
- Responsive font sizing with `clamp()`
- Proper line heights for readability
- Semantic heading hierarchy

---

## 🔧 Development Setup

### Prerequisites
- Node.js 16+ (with npm)
- PHP 7.4+ with PDO extension (running on XAMPP)
- MySQL 5.7+ database
- Composer for PHP dependencies

### Installation

```bash
# Clone the repository
git clone https://github.com/d-mather/flip-mather.git
cd FlipMatherPublicWebsite

# Frontend setup
npm install
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run lint      # Check code quality

# Backend setup (XAMPP)
# 1. Start XAMPP (Apache + MySQL)
# 2. Copy /api directory to htdocs or appropriate location
# 3. Import database backup file (found in root directory)
# 4. Update db.php with your database credentials
# 5. Configure Resend and PayFast API keys in send_resend.php and generate-payfast.php

# Environment Configuration
# Update API endpoints in:
# - src/OtherPages/Sponsor.jsx (production/testing URLs)
# - src/hooks/AuthProvider.jsx (API base URL)
```

---

## 📊 Database

Database schema and structure are provided via SQL backup file located in the project root directory (db_FlipMather.sql). Import this backup into MySQL to set up all required tables and data structure.

---

## 🛠️ Key Technologies Explained

### Why PHP for Backend?
Given the constraint of **shared hosting and XAMPP deployment**, PHP was the practical choice. In an ideal greenfield environment, this would be built with **C# ASP.NET Core MVC** for:
- Strongly-typed language benefits
- Built-in dependency injection
- Entity Framework ORM
- Superior performance characteristics

However, PHP provides excellent flexibility, widespread hosting support, and rapid development for this use case.

### Why React Frontend?
- Component-based architecture
- Efficient re-rendering with virtual DOM
- Rich ecosystem and libraries
- Strong community support
- SEO-friendly with proper meta tags

### Why Vite?
- 10-100x faster than Webpack
- Instant hot module replacement (HMR)
- Optimized production builds
- Modern ES module support

---

## 🎓 Code Quality Standards

- **ESLint Configuration** - Strict React and JavaScript linting
- **Prettier Formatting** - Consistent code style
- **Component Composition** - Reusable, focused components
- **Custom Hooks** - Logic extraction and reusability
- **Validation Functions** - Centralized, testable validators
- **Error Handling** - Comprehensive try-catch patterns
- **Documentation** - Clear comments for complex logic

---

## 📝 License

This project is proprietary and created for Flip Mather. All rights reserved.

---

## 👥 Contributing

This is a showcase project. For contributions or inquiries, please contact the development team.

---

## 📧 Contact & Support

- **Website:** [flipmather.co.za](https://flipmather.co.za)
- **Email:** [flipmather@gmail.com](mailto:flipmather@gmail.com)
- **GitHub:** [d-mather/flip-mather](https://github.com/d-mather/flip-mather)

---

## ✨ Highlights for Hiring

### What Demonstrates Senior Development Skills

✅ **Full-Stack Ownership** - Single developer handles entire project lifecycle  
✅ **Security-First Approach** - Rate limiting, input validation, password hashing, prepared statements  
✅ **Scalable Architecture** - Modular components, custom hooks, centralized validation  
✅ **Payment Integration** - Complex third-party API integration (PayFast)  
✅ **Email Infrastructure** - Automated email delivery (Resend API)  
✅ **Database Design** - Normalized schema with proper relationships  
✅ **API Design** - RESTful endpoints with proper HTTP semantics  
✅ **User Experience** - Dark mode, responsive design, smooth animations  
✅ **SEO & Analytics** - Google integration, meta tags, tracking  
✅ **Error Handling** - Comprehensive logging, graceful degradation  
✅ **Code Quality** - Linting, consistent style, meaningful naming  
✅ **Performance** - Code splitting, lazy loading, optimized queries  

### Business Impact

💰 **Monetization** - PayFast integration for sponsorship revenue  
📧 **Engagement** - Email verification and marketing integration  
📱 **Reach** - Mobile-responsive, SEO-optimized for discoverability  
👥 **Community** - User authentication and role-based access control  
📊 **Analytics** - Data-driven insights into user behavior  

---

**Built with ❤️ by a passionate full-stack developer.**
