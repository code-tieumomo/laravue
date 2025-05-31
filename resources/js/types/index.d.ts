import type { PageProps } from '@inertiajs/core';
import type { LucideIcon } from 'lucide-vue-next';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    group: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles_count?: number;
    roles?: Role[];
}

export type BreadcrumbItemType = BreadcrumbItem;

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    users_count: number;
    permissions_count: number;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
    users: User[];
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: PermissionRolePivot;
}

export interface PermissionRolePivot {
    role_id: number;
    permission_id: number;
}
