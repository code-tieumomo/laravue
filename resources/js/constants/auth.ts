/**
 * Permission constants for frontend use
 * These should match the PermissionEnum values from the backend
 */
export const PERMISSIONS = {
    // User Management Permissions
    USER_CREATE: 'user.create',
    USER_READ: 'user.read',
    USER_UPDATE: 'user.update',
    USER_DELETE: 'user.delete',

    // Role Management Permissions
    ROLE_CREATE: 'role.create',
    ROLE_READ: 'role.read',
    ROLE_UPDATE: 'role.update',
    ROLE_DELETE: 'role.delete',

    // Permission Management Permissions
    PERMISSION_CREATE: 'permission.create',
    PERMISSION_READ: 'permission.read',
    PERMISSION_UPDATE: 'permission.update',
    PERMISSION_DELETE: 'permission.delete',
} as const;

/**
 * Role constants for frontend use
 * These should match the RoleEnum values from the backend
 */
export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

/**
 * Permission type derived from PERMISSIONS object
 */
export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Role type derived from ROLES object
 */
export type RoleType = (typeof ROLES)[keyof typeof ROLES];
