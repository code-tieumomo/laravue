# Laravue Starter Kit

A modern, full-stack starter kit built with Laravel 12 and Vue.js 3, featuring a clean architecture, robust authentication system, and comprehensive admin panel for user and role management.

## ✨ Features

### 🔐 Authentication & Authorization

- Complete authentication system (login, register, password reset, email verification)
- Role-based access control using [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)
- Pre-configured roles and permissions system
- Admin panel for managing users, roles, and permissions

### 🎨 Modern Frontend

- **Vue.js 3** with Composition API and TypeScript
- **Inertia.js** for seamless SPA experience
- **Tailwind CSS 4** for modern, responsive styling
- **Reka UI** components for consistent design
- **Motion-v** for smooth animations
- Dark/Light mode support

### 🛠️ Developer Experience

- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Laravel Pint** for PHP code styling
- **Pest** for PHP testing
- **Vite** for fast development and optimized builds
- Hot module replacement (HMR) for development

### 📱 UI Components

- Responsive sidebar and header layouts
- Modern component library with shadcn/ui-inspired design
- Data tables with sorting and pagination
- Modal dialogs and forms
- Toast notifications
- Breadcrumb navigation

## 🚀 Quick Start

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm/yarn/pnpm
- MySQL/PostgreSQL/SQLite database

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/laravel/vue-starter-kit.git
    cd vue-starter-kit
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install JavaScript dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configure your database** in `.env`:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravue_starter
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. **Run migrations and seeders**

    ```bash
    php artisan migrate --seed
    ```

7. **Build assets and start development**

    ```bash
    # Development with hot reload
    npm run dev

    # In another terminal, start Laravel server
    php artisan serve

    # Or you can use single command with Composer and `concurrently`
    composer run dev
    ```

8. **Access the application**
    - Frontend: http://localhost:8000
    - Login with seeded admin: `test@example.com` / `password`

## 🏗️ Project Structure

```
├── app/
│   ├── Enums/           # Role and Permission enums
│   ├── Http/
│   │   ├── Controllers/ # API and web controllers
│   │   ├── Middleware/  # Custom middleware
│   │   └── Requests/    # Form request validation
│   └── Models/          # Eloquent models
├── database/
│   ├── migrations/      # Database schema
│   └── seeders/         # Sample data
├── resources/
│   ├── css/             # Tailwind CSS files
│   ├── js/
│   │   ├── components/  # Vue components
│   │   ├── layouts/     # Layout components
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript definitions
│   └── views/           # Blade templates
├── routes/
│   ├── web.php          # Web routes
│   ├── auth.php         # Authentication routes
│   ├── admin.php        # Admin panel routes
│   └── settings.php     # User settings routes
└── tests/               # PHPUnit/Pest tests
```

## 🔧 Development Commands

### Frontend Development

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Build with SSR support
npm run build:ssr

# Code formatting
npm run format
npm run format:check

# Linting
npm run lint
```

### Backend Development

```bash
# Start Laravel development server
php artisan serve

# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Clear application cache
php artisan optimize:clear

# Code formatting with Pint
./vendor/bin/pint

# Run tests
php artisan test
```

## 🎯 Key Features Walkthrough

### Admin Panel

Navigate to `/admin` to access the administration interface:

- **Users Management**: Create, edit, delete users and assign roles
- **Roles Management**: Define roles and assign permissions
- **Permissions Management**: Create and manage granular permissions

### Authentication Flow

- Registration with email verification
- Login with "remember me" functionality
- Password reset via email
- Profile management and password updates

### Settings Panel

Users can access `/settings` to:

- Update profile information
- Change password
- Customize appearance (dark/light mode)

## 🔐 Roles & Permissions

The application comes with a pre-configured RBAC system:

### Default Roles

- **Admin**: Full system access
- **User**: Basic user permissions

### Permission Categories

- User management (`user.create`, `user.read`, `user.update`, `user.delete`)
- Role management (`role.create`, `role.read`, `role.update`, `role.delete`)
- Permission management (`permission.create`, `permission.read`, `permission.update`, `permission.delete`)

## 🎨 UI Components

Built with a modern component library featuring:

- **Layout Components**: Sidebar, Header, Content areas
- **Form Components**: Inputs, Selects, Checkboxes, Buttons
- **Data Display**: Tables, Cards, Badges, Avatars
- **Feedback**: Toasts, Modals, Alerts
- **Navigation**: Breadcrumbs, Menus, Pagination

## 🔧 Configuration

### Environment Variables

Key configuration options in `.env`:

```env
# Application
APP_NAME="Laravue Starter Kit"
APP_ENV=local
APP_DEBUG=true

# Database
DB_CONNECTION=mysql

# Email (for authentication features)
MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025

# Frontend
VITE_APP_NAME="${APP_NAME}"
```

### Customization

- **Styling**: Modify `resources/css/app.css` and Tailwind configuration
- **Components**: Extend or create new components in `resources/js/components/`
- **Routes**: Add new routes in respective route files
- **Permissions**: Update `PermissionEnum` and `RoleEnum` classes

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/Auth/AuthenticationTest.php

# Run tests with coverage
php artisan test --coverage
```

## 📦 Tech Stack

### Backend

- **Laravel 12** - PHP framework
- **Spatie Laravel Permission** - Role and permission management
- **Inertia.js** - Modern monolith approach
- **Laravel Pint** - Code styling
- **Pest** - Testing framework

### Frontend

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Reka UI** - Headless UI components
- **Vite** - Build tool and dev server
- **Motion-v** - Animation library

### Development Tools

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Laravel Sail** - Docker development environment (optional)

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

- [Laravel Documentation](https://laravel.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/laravel/vue-starter-kit/issues) page
2. Review the documentation links above
3. Create a new issue with detailed information

---

Built with ❤️ using Laravel and Vue.js
