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
    permissions: Permission[];
}>();

const page = usePage<SharedData>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: route('admin.roles.index'),
    },
    {
        title: 'Create Role',
        href: '',
    },
];

const form = useForm({
    name: '' as string,
    permissions: [] as string[],
});

const handleChange = (value: boolean | 'indeterminate', permissionName: string) => {
    if (value === true) {
        form.permissions.push(permissionName);
    } else if (value === false) {
        form.permissions = form.permissions.filter((name: string) => name !== permissionName);
    }
};

const submit = () => {
    form.post(route('admin.roles.store'), {
        onSuccess: () => {
            toast.success('Role created successfully!');
        },
        onError: (errors) => {
            toast.error('Failed to create role. Please check the form for errors.');
            console.error(errors);
        },
    });
};
</script>

<template>
    <Head title="Create Role" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                    <h2 class="text-xl font-semibold tracking-tight">Create Role</h2>
                    <p class="text-muted-foreground text-sm">
                        Define a new role and assign permissions.
                    </p>
                </div>
                <div>
                    <Button @click="submit">
                        <Check class="mr-2 size-4" />
                        Save
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
