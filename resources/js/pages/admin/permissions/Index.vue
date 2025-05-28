<script setup lang="ts">
import PermissionItem from '@/components/PermissionItem.vue';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem, Permission } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import { Plus } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

defineProps<{ permissions: Permission[] }>();

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Permissions', href: route('admin.permissions.index') }];

const deletePermission = (permission: Permission) => {
    router.delete(route('admin.permissions.destroy', permission.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success(`Permission ${permission.name} deleted successfully!`);
        },
        onError: (errors) => {
            toast.error(`Failed to delete permission ${permission.name}. Please try again.`);
            console.error(errors);
        },
    });
};
</script>
<template>
    <Head title="Permissions" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                    <h2 class="text-xl font-semibold tracking-tight">Permissions</h2>
                    <p class="text-muted-foreground text-sm">Manage permissions</p>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <PermissionItem v-for="permission in permissions" :key="permission.id" :permission="permission" />
            </div>
        </div>
    </AppLayout>
</template>
