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
import { BreadcrumbItem, Role } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import dayjs from 'dayjs';
import { Pencil, Plus, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

defineProps<{
    roles: Role[];
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: route('admin.roles.index'),
    },
];

const deleteRole = (role: Role) => {
    router.delete(route('admin.roles.destroy', role.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success(`Role ${role.name} deleted successfully!`);
        },
        onError: (errors) => {
            toast.error(`Failed to delete role ${role.name}. Please try again.`);
            console.error(errors);
        },
    });
};
</script>

<template>
    <Head title="Roles" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold">Roles</h1>
                <div>
                    <Button>
                        <Plus class="mr-2 size-4" />
                        Create Role
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Guard</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead class="w-[100px] text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(role, index) in roles" :key="role.id">
                        <TableCell class="font-medium">
                            {{ index + 1 }}
                        </TableCell>
                        <TableCell class="font-bold uppercase">{{ role.name }}</TableCell>
                        <TableCell>
                            <Badge>
                                {{ role.guard_name }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ dayjs(role.created_at).format('YYYY-MM-DD HH:MM:ss') }}</TableCell>
                        <TableCell>{{ dayjs(role.updated_at).format('YYYY-MM-DD HH:MM:ss') }}</TableCell>
                        <TableCell>
                            <Link :href="route('admin.roles.edit', role.id)">
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
                                            This action cannot be undone. This will permanently delete role <strong>{{ role.name }}</strong
                                            >.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction @click="deleteRole(role)">Delete</AlertDialogAction>
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
