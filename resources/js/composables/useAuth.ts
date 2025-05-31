import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

/**
 * Vue composable for role and permission checks
 * Provides reactive methods to check user roles and permissions
 */
export function useAuth() {
    const page = usePage<SharedData>();

    // Get current user
    const user = computed(() => page.props.auth.user);

    // Get current user's permissions
    const permissions = computed(() => page.props.auth.permissions || []);

    // Get current user's roles
    const roles = computed(() => user.value?.roles?.map((role) => role.name) || []);

    /**
     * Check if user has a specific role
     * @param role - Role name to check
     * @returns boolean
     */
    const hasRole = (role: string): boolean => {
        return roles.value.includes(role);
    };

    /**
     * Check if user has any of the specified roles
     * @param roleNames - Array of role names to check
     * @returns boolean
     */
    const hasAnyRole = (roleNames: string[]): boolean => {
        return roleNames.some((role) => hasRole(role));
    };

    /**
     * Check if user has all of the specified roles
     * @param roleNames - Array of role names to check
     * @returns boolean
     */
    const hasAllRoles = (roleNames: string[]): boolean => {
        return roleNames.every((role) => hasRole(role));
    };

    /**
     * Check if user has a specific permission
     * @param permission - Permission name to check
     * @returns boolean
     */
    const hasPermission = (permission: string): boolean => {
        return permissions.value.includes(permission);
    };

    /**
     * Check if user has any of the specified permissions
     * @param permissionNames - Array of permission names to check
     * @returns boolean
     */
    const hasAnyPermission = (permissionNames: string[]): boolean => {
        return permissionNames.some((permission) => hasPermission(permission));
    };

    /**
     * Check if user has all of the specified permissions
     * @param permissionNames - Array of permission names to check
     * @returns boolean
     */
    const hasAllPermissions = (permissionNames: string[]): boolean => {
        return permissionNames.every((permission) => hasPermission(permission));
    };

    /**
     * Check if user is authenticated
     * @returns boolean
     */
    const isAuthenticated = computed(() => !!user.value);

    /**
     * Check if user is an admin (has admin role)
     * @returns boolean
     */
    const isAdmin = computed(() => hasRole('admin'));

    /**
     * Check if user can perform a specific action
     * Convenience method that checks both role and permission
     * @param action - Object with role and/or permission requirements
     * @returns boolean
     */
    const can = (action: { role?: string | string[]; permission?: string | string[]; requireAll?: boolean }): boolean => {
        const { role, permission, requireAll = false } = action;

        const roleCheck = role ? (Array.isArray(role) ? (requireAll ? hasAllRoles(role) : hasAnyRole(role)) : hasRole(role)) : true;

        const permissionCheck = permission
            ? Array.isArray(permission)
                ? requireAll
                    ? hasAllPermissions(permission)
                    : hasAnyPermission(permission)
                : hasPermission(permission)
            : true;

        return requireAll ? roleCheck && permissionCheck : roleCheck || permissionCheck;
    };

    return {
        // Computed properties
        user,
        permissions,
        roles,
        isAuthenticated,
        isAdmin,

        // Role checking methods
        hasRole,
        hasAnyRole,
        hasAllRoles,

        // Permission checking methods
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,

        // Convenience method
        can,
    };
}
