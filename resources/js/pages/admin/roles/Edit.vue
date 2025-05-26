<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem, Permission, Role, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { Check } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const props = defineProps<{
    role: Role;
    permissions: Permission[];
}>();

const page = usePage<SharedData>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: route('admin.roles.index'),
    },
    {
        title: 'Edit Role',
        href: '',
    },
];

const form = useForm({
    name: props.role.name,
    permissions: props.role.permissions.map((permission: Permission) => permission.name),
});

const handleChange = (value: boolean | 'indeterminate', permissionName: string) => {
    if (value === true) {
        form.permissions.push(permissionName);
    } else if (value === false) {
        form.permissions = form.permissions.filter((name: string) => name !== permissionName);
    }
};

const submit = () => {
    form.put(route('admin.roles.update', props.role.id), {
        onSuccess: () => {
            toast.success('Role updated successfully!');
        },
        onError: (errors) => {
            toast.error('Failed to update role. Please check the form for errors.');
            console.error(errors);
        },
    });
};
</script>

<template>
    <Head title="Edit Role" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold">Edit Role: {{ role.name.toUpperCase() }}</h1>
                <div>
                    <Button @click="submit">
                        <Check class="mr-2 size-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <form class="mt-4 grid grid-cols-4 gap-8" @submit.prevent="submit">
                <div class="col-span-1">
                    <Label for="name" class="mb-2" required>Name</Label>
                    <Input id="name" v-model="form.name" type="text" placeholder="Role Name" />
                    <p v-if="page.props.errors.name" class="mt-1 text-xs text-red-500">
                        {{ page.props.errors.name }}
                    </p>
                </div>
                <div class="col-span-4">
                    <Label for="permissions" class="mb-4">Permissions</Label>
                    <div class="grid grid-cols-4 gap-4">
                        <div v-for="permission in permissions" :key="permission.id" class="flex items-center gap-2">
                            <Checkbox
                                :id="`permission-${permission.id}`"
                                :model-value="form.permissions.includes(permission.name)"
                                @update:model-value="handleChange($event, permission.name)"
                            />
                            <Label :for="`permission-${permission.id}`">{{ permission.name }}</Label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
