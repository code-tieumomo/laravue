<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

defineProps<{
    users: User[];
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: route('admin.users.index'),
    },
];

const deleteUser = (user: User) => {
    router.delete(route('admin.users.destroy', user.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success(`User ${user.name} deleted successfully!`);
        },
        onError: (errors) => {
            toast.error(`Failed to delete user ${user.name}. Please try again.`);
            console.error(errors);
        },
    });
};
</script>

<template>
    <Head title="Users" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                    <h2 class="text-xl font-semibold tracking-tight">Users</h2>
                    <p class="text-muted-foreground text-sm">Manage system users</p>
                </div>
                <div>
                    <Link :href="route('admin.users.create')">
                        <Button>
                            <Plus class="mr-2 size-4" />
                            Create User
                        </Button>
                    </Link>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead class="text-center">Roles</TableHead>
                        <TableHead class="text-center">Email Verified</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead class="w-[100px] text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(user, index) in users" :key="user.id">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell class="font-bold">{{ user.name }}</TableCell>
                        <TableCell>{{ user.email }}</TableCell>
                        <TableCell class="text-center">
                            <div class="flex flex-wrap justify-center gap-1">
                                <Badge v-for="role in user.roles" :key="role.id" variant="secondary">
                                    {{ role.name }}
                                </Badge>
                                <span v-if="!user.roles || user.roles.length === 0" class="text-muted-foreground text-sm">No roles</span>
                            </div>
                        </TableCell>
                        <TableCell class="text-center">
                            <Badge :variant="user.email_verified_at ? 'default' : 'destructive'">
                                {{ user.email_verified_at ? 'Verified' : 'Unverified' }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ dayjs(user.created_at).format('YYYY-MM-DD HH:MM:ss') }}</TableCell>
                        <TableCell>{{ dayjs(user.updated_at).format('YYYY-MM-DD HH:MM:ss') }}</TableCell>
                        <TableCell>
                            <Link :href="route('admin.users.edit', user.id)">
                                <Button size="icon" class="mr-2">
                                    <Pencil class="size-4" />
                                </Button>
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button size="icon" variant="destructive">
                                        <Trash2 class="size-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete user <strong>{{ user.name }}</strong> and
                                            remove all associated data.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction @click="deleteUser(user)">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </AppLayout>
</template>
