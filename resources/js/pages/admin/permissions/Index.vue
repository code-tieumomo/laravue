<script setup lang="ts">
import PermissionItem from '@/components/PermissionItem.vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem, Permission } from '@/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';
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

const isCreateDialogOpen = ref(false);

const createForm = useForm({
    name: '',
});

const createPermission = () => {
    createForm.post(route('admin.permissions.store'), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Permission created successfully!');
            createForm.reset();
            isCreateDialogOpen.value = false;
        },
        onError: (errors) => {
            toast.error('Failed to create permission. Please check the form for errors.');
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
                <Dialog v-model:open="isCreateDialogOpen">
                    <DialogTrigger :as-child="true">
                        <Button>
                            <Plus class="mr-2 size-4" />
                            Create Permission
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Permission</DialogTitle>
                            <DialogDescription> Create a new permission. Click save when you're done. </DialogDescription>
                        </DialogHeader>
                        <form @submit.prevent="createPermission">
                            <div class="grid gap-4 py-4">
                                <div class="grid grid-cols-4 items-center gap-4">
                                    <Label for="name" class="text-right">Name</Label>
                                    <Input id="name" v-model="createForm.name" placeholder="Permission name" class="col-span-3" required />
                                </div>
                                <div v-if="createForm.errors.name" class="text-sm text-red-500">
                                    {{ createForm.errors.name }}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" :disabled="createForm.processing">
                                    {{ createForm.processing ? 'Creating...' : 'Create Permission' }}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <PermissionItem v-for="permission in permissions" :key="permission.id" :permission="permission" @delete="deletePermission" />
            </div>
        </div>
    </AppLayout>
</template>
