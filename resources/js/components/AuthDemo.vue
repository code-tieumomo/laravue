<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';
import { PERMISSIONS, ROLES } from '@/constants/auth';

// Using the auth composable
const { user, roles, permissions, isAuthenticated, isAdmin, hasRole, hasPermission, hasAnyPermission, hasAllPermissions, can } = useAuth();

// Example usage of different permission checks
const canCreateUsers = hasPermission(PERMISSIONS.USER_CREATE);
const canManageRoles = hasAnyPermission([PERMISSIONS.ROLE_CREATE, PERMISSIONS.ROLE_UPDATE, PERMISSIONS.ROLE_DELETE]);
const canFullUserManagement = hasAllPermissions([PERMISSIONS.USER_CREATE, PERMISSIONS.USER_UPDATE, PERMISSIONS.USER_DELETE]);

// Complex permission check using the 'can' method
const canAccessAdminPanel = can({
    role: ROLES.ADMIN,
    permission: [PERMISSIONS.USER_READ, PERMISSIONS.ROLE_READ],
    requireAll: false, // User needs admin role OR any of the permissions
});

const canDeleteUsers = can({
    role: ROLES.ADMIN,
    permission: PERMISSIONS.USER_DELETE,
    requireAll: true, // User needs admin role AND delete permission
});
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="mb-4 text-xl font-semibold">Auth Composable Demo</h2>

            <!-- User Info -->
            <div class="mb-4 rounded-lg bg-gray-50 p-4">
                <h3 class="mb-2 font-medium">Current User</h3>
                <p v-if="isAuthenticated">
                    <strong>Name:</strong> {{ user?.name }}<br />
                    <strong>Email:</strong> {{ user?.email }}<br />
                    <strong>Is Admin:</strong> {{ isAdmin ? 'Yes' : 'No' }}
                </p>
                <p v-else>Not authenticated</p>
            </div>

            <!-- Roles -->
            <div class="mb-4 rounded-lg bg-blue-50 p-4">
                <h3 class="mb-2 font-medium">User Roles</h3>
                <div class="flex gap-2" v-if="roles.length > 0">
                    <Badge v-for="role in roles" :key="role" variant="secondary">
                        {{ role }}
                    </Badge>
                </div>
                <p v-else class="text-gray-500">No roles assigned</p>
            </div>

            <!-- Permissions -->
            <div class="mb-4 rounded-lg bg-green-50 p-4">
                <h3 class="mb-2 font-medium">User Permissions</h3>
                <div class="grid grid-cols-2 gap-2" v-if="permissions.length > 0">
                    <Badge v-for="permission in permissions" :key="permission" variant="outline" class="text-xs">
                        {{ permission }}
                    </Badge>
                </div>
                <p v-else class="text-gray-500">No permissions assigned</p>
            </div>

            <!-- Permission Checks -->
            <div class="mb-4 rounded-lg bg-yellow-50 p-4">
                <h3 class="mb-2 font-medium">Permission Checks</h3>
                <div class="space-y-2">
                    <div class="flex items-center gap-2">
                        <Badge :variant="canCreateUsers ? 'default' : 'destructive'">
                            {{ canCreateUsers ? '✓' : '✗' }}
                        </Badge>
                        <span>Can create users</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge :variant="canManageRoles ? 'default' : 'destructive'">
                            {{ canManageRoles ? '✓' : '✗' }}
                        </Badge>
                        <span>Can manage roles (any role permission)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge :variant="canFullUserManagement ? 'default' : 'destructive'">
                            {{ canFullUserManagement ? '✓' : '✗' }}
                        </Badge>
                        <span>Can fully manage users (all user permissions)</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge :variant="canAccessAdminPanel ? 'default' : 'destructive'">
                            {{ canAccessAdminPanel ? '✓' : '✗' }}
                        </Badge>
                        <span>Can access admin panel</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge :variant="canDeleteUsers ? 'default' : 'destructive'">
                            {{ canDeleteUsers ? '✓' : '✗' }}
                        </Badge>
                        <span>Can delete users (admin + permission)</span>
                    </div>
                </div>
            </div>

            <!-- Conditional Rendering Examples -->
            <div class="rounded-lg bg-purple-50 p-4">
                <h3 class="mb-2 font-medium">Conditional UI Elements</h3>
                <div class="space-y-2">
                    <Button v-if="hasRole('admin')" variant="destructive"> Admin Only Button </Button>
                    <Button v-if="hasPermission(PERMISSIONS.USER_CREATE)" variant="default"> Create User </Button>
                    <Button v-if="can({ role: 'admin', permission: PERMISSIONS.USER_DELETE })" variant="destructive">
                        Delete User (Admin + Permission)
                    </Button>
                    <p v-if="!isAuthenticated" class="text-red-500">Please log in to see more options</p>
                </div>
            </div>
        </div>
    </div>
</template>
