# Laravue Starter Kit

A modern, full-stack starter kit built with Laravel 12 and Vue.js 3, featuring a clean architecture, robust authentication system, and comprehensive admin panel for user and role management.

## ✨ Features

### 🔐 Authentication & Authorization

- Complete authentication system (login, register, password reset, email verification)
- Role-based access control using [Spatie Laravel Permission](https://spatie.be/docs/larave### Frontend Constants\*\*: Update `resources/js/constants/auth.ts` to match backend enums

#### Best Practices

**1. Use Composables Consistently:**

```vue
// ✅ Good - Import from composables import { useAuth } from '@/composables/useAuth'; // ❌ Avoid - Direct access to page props import { usePage }
from '@inertiajs/vue3'; const page = usePage(); const user = page.props.auth.user;
```

**2. Use Permission Constants:**

```vue
// ✅ Good - Use constants import { PERMISSIONS } from '@/constants/auth'; const canCreate = hasPermission(PERMISSIONS.USER_CREATE); // ❌ Avoid -
Magic strings const canCreate = hasPermission('user.create');
```

**3. Combine Business Logic:**

```vue
// ✅ Good - Use advanced composable for complex logic import { usePermissions } from '@/composables/usePermissions'; const { canEditUser } =
usePermissions(); // ❌ Avoid - Inline complex logic const canEdit = hasRole('admin') && hasPermission('user.update') && user.id !== targetUser.id;
```

**4. Handle Unauthorized States:**

````vue
// ✅ Good - Graceful handling
<template>
    <div v-if="hasPermission(PERMISSIONS.USER_CREATE)">
        <Button>Create User</Button>
    </div>
    <div v-else>
        <p class="text-gray-500">You don't have permission to create users.</p>
    </div>
</template>
```-permission) - Pre-configured roles and permissions system - Admin panel for managing users, roles, and permissions ### 🎨 Modern Frontend -
**Vue.js 3** with Composition API and TypeScript - **Inertia.js** for seamless SPA experience - **Tailwind CSS 4** for modern, responsive styling -
**Reka UI** components for consistent design - **Motion-v** for smooth animations - Dark/Light mode support ### 🛠️ Developer Experience -
**TypeScript** for type safety - **ESLint** and **Prettier** for code quality - **Laravel Pint** for PHP code styling - **Pest** for PHP testing -
**Vite** for fast development and optimized builds - Hot module replacement (HMR) for development ### 📱 UI Components - Responsive sidebar and header
layouts - Modern component library with shadcn/ui-inspired design - Data tables with sorting and pagination - Modal dialogs and forms - Toast
notifications - Breadcrumb navigation ## 🚀 Quick Start ### Prerequisites - PHP 8.2 or higher - Composer - Node.js 18+ and npm/yarn/pnpm -
MySQL/PostgreSQL/SQLite database ### Installation 1. **Clone the repository** ```bash git clone https://github.com/laravel/vue-starter-kit.git cd
vue-starter-kit ``` 2. **Install PHP dependencies** ```bash composer install ``` 3. **Install JavaScript dependencies** ```bash npm install ``` 4.
**Environment setup** ```bash cp .env.example .env php artisan key:generate ``` 5. **Configure your database** in `.env`: ```env DB_CONNECTION=mysql
DB_HOST=127.0.0.1 DB_PORT=3306 DB_DATABASE=laravue_starter DB_USERNAME=your_username DB_PASSWORD=your_password ``` 6. **Run migrations and seeders**
```bash php artisan migrate --seed ``` 7. **Build assets and start development** ```bash # Development with hot reload npm run dev # In another
terminal, start Laravel server php artisan serve # Or you can use single command with Composer and `concurrently` composer run dev ``` 8. **Access the
application** - Frontend: http://localhost:8000 - Login with seeded admin: `test@example.com` / `password` ## 🏗️ Project Structure
````

├── app/
│ ├── Enums/ # Role and Permission enums
│ ├── Http/
│ │ ├── Controllers/ # API and web controllers
│ │ ├── Middleware/ # Custom middleware
│ │ └── Requests/ # Form request validation
│ └── Models/ # Eloquent models
├── database/
│ ├── migrations/ # Database schema
│ └── seeders/ # Sample data
├── resources/
│ ├── css/ # Tailwind CSS files
│ ├── js/
│ │ ├── components/ # Vue components
│ │ ├── layouts/ # Layout components
│ │ ├── pages/ # Page components
│ │ └── types/ # TypeScript definitions
│ └── views/ # Blade templates
├── routes/
│ ├── web.php # Web routes
│ ├── auth.php # Authentication routes
│ ├── admin.php # Admin panel routes
│ └── settings.php # User settings routes
└── tests/ # PHPUnit/Pest tests

````

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
````

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

The admin interface automatically adapts based on user permissions using the `useAuth()` and `usePermissions()` composables.

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

## 🎨 UI Components

Built with a modern component library featuring:

- **Layout Components**: Sidebar, Header, Content areas
- **Form Components**: Inputs, Selects, Checkboxes, Buttons
- **Data Display**: Tables, Cards, Badges, Avatars
- **Feedback**: Toasts, Modals, Alerts
- **Navigation**: Breadcrumbs, Menus, Pagination

## 🔐 Role & Permission Management

### Backend Implementation

The application uses [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission) for robust role-based access control:

#### Default Roles

- **Admin**: Full system access
- **User**: Basic user permissions

#### Permission Categories

- User management (`user.create`, `user.read`, `user.update`, `user.delete`)
- Role management (`role.create`, `role.read`, `role.update`, `role.delete`)
- Permission management (`permission.create`, `permission.read`, `permission.update`, `permission.delete`)

### Frontend Implementation

#### Vue Composables for Permission Checking

**`useAuth()` - Core Authentication & Authorization**

```vue
<script setup>
import { useAuth } from '@/composables/useAuth';
import { PERMISSIONS, ROLES } from '@/constants/auth';

const { user, roles, permissions, isAuthenticated, isAdmin, hasRole, hasPermission, hasAnyPermission, hasAllPermissions, can } = useAuth();

// Simple permission checks
const canCreateUsers = hasPermission(PERMISSIONS.USER_CREATE);
const isAdminUser = hasRole(ROLES.ADMIN);

// Complex permission checks
const canAccessAdmin = can({
    role: ROLES.ADMIN,
    permission: [PERMISSIONS.USER_READ, PERMISSIONS.ROLE_READ],
    requireAll: false, // Either admin role OR any permission
});
</script>

<template>
    <!-- Conditional rendering based on permissions -->
    <Button v-if="hasPermission(PERMISSIONS.USER_CREATE)"> Create User </Button>

    <div v-if="hasRole(ROLES.ADMIN)">Admin Only Content</div>
</template>
```

**`usePermissions()` - Advanced Business Logic**

```vue
<script setup>
import { usePermissions } from '@/composables/usePermissions';

const { canManageUsers, canEditUser, canDeleteUser, getUserActions, navigation } = usePermissions();

// Business logic for user management
const handleUserAction = (userId) => {
    const actions = getUserActions(userId);
    // actions might be ['edit', 'delete', 'assign-roles']
};
</script>
```

#### Available Methods

**Role Checking:**

- `hasRole(role: string)` - Check single role
- `hasAnyRole(roles: string[])` - Check any of multiple roles
- `hasAllRoles(roles: string[])` - Check all roles required

**Permission Checking:**

- `hasPermission(permission: string)` - Check single permission
- `hasAnyPermission(permissions: string[])` - Check any permission
- `hasAllPermissions(permissions: string[])` - Check all permissions

**Advanced Checking:**

- `can({ role?, permission?, requireAll? })` - Complex conditional logic
- `canEditUser(userId)` - Business-specific user edit logic
- `canDeleteUser(userId)` - Business-specific user delete logic

#### Constants & Types

```typescript
// Available in @/constants/auth
export const PERMISSIONS = {
    USER_CREATE: 'user.create',
    USER_READ: 'user.read',
    USER_UPDATE: 'user.update',
    USER_DELETE: 'user.delete',
    // ... more permissions
};

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};
```

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

### Frontend Permission Integration Examples

**Protecting Routes with Middleware:**

```vue
<!-- pages/admin/users/Index.vue -->
<script setup>
import { useAuth } from '@/composables/useAuth';
import { PERMISSIONS } from '@/constants/auth';

const { hasPermission, hasRole } = useAuth();

// Redirect if no admin access
if (!hasRole('admin')) {
    // Handle unauthorized access
}
</script>
```

**Conditional Menu Items:**

```vue
<!-- layouts/Navigation.vue -->
<script setup>
import { usePermissions } from '@/composables/usePermissions';

const { navigation } = usePermissions();
</script>

<template>
    <nav>
        <Link v-if="navigation.canViewUsers" href="/admin/users"> Users </Link>
        <Link v-if="navigation.canViewRoles" href="/admin/roles"> Roles </Link>
    </nav>
</template>
```

**Dynamic Action Buttons:**

```vue
<!-- components/UserCard.vue -->
<script setup>
import { usePermissions } from '@/composables/usePermissions';

const props = defineProps<{ user: User }>();
const { canEditUser, canDeleteUser } = usePermissions();
</script>

<template>
    <div class="user-card">
        <h3>{{ user.name }}</h3>

        <div class="actions">
            <Button v-if="canEditUser(user.id)" @click="editUser(user)"> Edit </Button>

            <Button v-if="canDeleteUser(user.id)" variant="destructive" @click="deleteUser(user)"> Delete </Button>
        </div>
    </div>
</template>
```

### Customization

- **Styling**: Modify `resources/css/app.css` and Tailwind configuration
- **Components**: Extend or create new components in `resources/js/components/`
- **Routes**: Add new routes in respective route files
- **Permissions**: Update `PermissionEnum` and `RoleEnum` classes
- **Frontend Constants**: Update `resources/js/constants/auth.ts` to match backend enums

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
