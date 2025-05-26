<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // User Management Permissions
    case USER_CREATE = 'user.create';
    case USER_READ = 'user.read';
    case USER_UPDATE = 'user.update';
    case USER_DELETE = 'user.delete';

    // Role Management Permissions
    case ROLE_CREATE = 'role.create';
    case ROLE_READ = 'role.read';
    case ROLE_UPDATE = 'role.update';
    case ROLE_DELETE = 'role.delete';

    // Permission Management Permissions
    case PERMISSION_CREATE = 'permission.create';
    case PERMISSION_READ = 'permission.read';
    case PERMISSION_UPDATE = 'permission.update';
    case PERMISSION_DELETE = 'permission.delete';
}
