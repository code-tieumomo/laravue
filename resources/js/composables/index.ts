// Export all auth-related composables
export { useAuth } from './useAuth';
export { usePermissions } from './usePermissions';

// Re-export commonly used items
export { PERMISSIONS, ROLES } from '@/constants/auth';
export type { PermissionType, RoleType } from '@/constants/auth';
