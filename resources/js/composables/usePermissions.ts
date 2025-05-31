import { PERMISSIONS, ROLES } from '@/constants/auth';
import { computed } from 'vue';
import { useAuth } from './useAuth';

/**
 * Advanced composable for complex business logic permission checks
 * This demonstrates how to build upon the base useAuth composable
 */
export function usePermissions() {
    const { hasRole, hasPermission, hasAnyPermission, can, user } = useAuth();

    /**
     * Check if user can manage users (create, edit, delete)
     */
    const canManageUsers = computed(() => {
        return hasAnyPermission([PERMISSIONS.USER_CREATE, PERMISSIONS.USER_UPDATE, PERMISSIONS.USER_DELETE]);
    });

    /**
     * Check if user can manage roles and permissions
     */
    const canManageRoles = computed(() => {
        return hasAnyPermission([
            PERMISSIONS.ROLE_CREATE,
            PERMISSIONS.ROLE_UPDATE,
            PERMISSIONS.ROLE_DELETE,
            PERMISSIONS.PERMISSION_CREATE,
            PERMISSIONS.PERMISSION_UPDATE,
            PERMISSIONS.PERMISSION_DELETE,
        ]);
    });

    /**
     * Check if user has admin access
     */
    const hasAdminAccess = computed(() => {
        return hasRole(ROLES.ADMIN) || canManageUsers.value || canManageRoles.value;
    });

    /**
     * Check if user can edit another user
     * Business rule: Users can edit themselves, admins can edit anyone
     */
    const canEditUser = (targetUserId: number) => {
        const isOwnProfile = user.value?.id === targetUserId;
        const hasEditPermission = hasPermission(PERMISSIONS.USER_UPDATE);
        const isAdmin = hasRole(ROLES.ADMIN);

        return isOwnProfile || (hasEditPermission && isAdmin);
    };

    /**
     * Check if user can delete another user
     * Business rule: Cannot delete yourself, must have delete permission and admin role
     */
    const canDeleteUser = (targetUserId: number) => {
        const isOwnProfile = user.value?.id === targetUserId;
        const hasDeletePermission = hasPermission(PERMISSIONS.USER_DELETE);
        const isAdmin = hasRole(ROLES.ADMIN);

        return !isOwnProfile && hasDeletePermission && isAdmin;
    };

    /**
     * Check if user can assign roles to another user
     * Business rule: Must be admin and have role management permissions
     */
    const canAssignRoles = computed(() => {
        return hasRole(ROLES.ADMIN) && hasAnyPermission([PERMISSIONS.ROLE_CREATE, PERMISSIONS.ROLE_UPDATE]);
    });

    /**
     * Check if user can view sensitive information
     * Business rule: Admins or users with specific read permissions
     */
    const canViewSensitiveData = computed(() => {
        return hasRole(ROLES.ADMIN) || hasAnyPermission([PERMISSIONS.USER_READ, PERMISSIONS.ROLE_READ, PERMISSIONS.PERMISSION_READ]);
    });

    /**
     * Get available actions for a user based on permissions
     */
    const getUserActions = (targetUserId: number) => {
        const actions = [];

        if (canEditUser(targetUserId)) {
            actions.push('edit');
        }

        if (canDeleteUser(targetUserId)) {
            actions.push('delete');
        }

        if (canAssignRoles.value) {
            actions.push('assign-roles');
        }

        if (canViewSensitiveData.value) {
            actions.push('view-details');
        }

        return actions;
    };

    /**
     * Check navigation permissions
     */
    const navigation = computed(() => ({
        canViewAdminPanel: hasAdminAccess.value,
        canViewUsers: hasPermission(PERMISSIONS.USER_READ) || hasRole(ROLES.ADMIN),
        canViewRoles: hasPermission(PERMISSIONS.ROLE_READ) || hasRole(ROLES.ADMIN),
        canViewPermissions: hasPermission(PERMISSIONS.PERMISSION_READ) || hasRole(ROLES.ADMIN),
    }));

    /**
     * Get permission summary for debugging
     */
    const getPermissionSummary = () => {
        return {
            userRoles: user.value?.roles?.map((role) => role.name) || [],
            canManageUsers: canManageUsers.value,
            canManageRoles: canManageRoles.value,
            hasAdminAccess: hasAdminAccess.value,
            canAssignRoles: canAssignRoles.value,
            canViewSensitiveData: canViewSensitiveData.value,
            navigation: navigation.value,
        };
    };

    return {
        // Computed permissions
        canManageUsers,
        canManageRoles,
        hasAdminAccess,
        canAssignRoles,
        canViewSensitiveData,
        navigation,

        // Methods
        canEditUser,
        canDeleteUser,
        getUserActions,
        getPermissionSummary,
    };
}
