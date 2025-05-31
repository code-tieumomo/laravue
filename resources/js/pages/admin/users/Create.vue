<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem, Role, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { Check } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const props = defineProps<{
    roles: Role[];
}>();

const page = usePage<SharedData>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: route('admin.users.index'),
    },
    {
        title: 'Create User',
        href: '',
    },
];

const form = useForm({
    name: '' as string,
    email: '' as string,
    password: '' as string,
    password_confirmation: '' as string,
    roles: [] as string[],
});

const handleRoleChange = (value: boolean | 'indeterminate', roleName: string) => {
    if (value === true) {
        form.roles.push(roleName);
    } else if (value === false) {
        form.roles = form.roles.filter((name: string) => name !== roleName);
    }
};

const submit = () => {
    form.post(route('admin.users.store'), {
        onSuccess: () => {
            toast.success('User created successfully!');
        },
        onError: (errors) => {
            toast.error('Failed to create user. Please check the form for errors.');
            console.error(errors);
        },
    });
};
</script>

<template>
    <Head title="Create User" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                    <h2 class="text-xl font-semibold tracking-tight">Create User</h2>
                    <p class="text-muted-foreground text-sm">Create a new user and assign roles.</p>
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
                    <Input id="name" v-model="form.name" type="text" placeholder="Full Name" />
                    <p v-if="page.props.errors.name" class="mt-1 text-xs text-red-500">
                        {{ page.props.errors.name }}
                    </p>
                </div>
                <div class="col-span-1">
                    <Label for="email" class="mb-2" required>Email</Label>
                    <Input id="email" v-model="form.email" type="email" placeholder="Email Address" />
                    <p v-if="page.props.errors.email" class="mt-1 text-xs text-red-500">
                        {{ page.props.errors.email }}
                    </p>
                </div>
                <div class="col-span-1">
                    <Label for="password" class="mb-2" required>Password</Label>
                    <Input id="password" v-model="form.password" type="password" placeholder="Password" />
                    <p v-if="page.props.errors.password" class="mt-1 text-xs text-red-500">
                        {{ page.props.errors.password }}
                    </p>
                </div>
                <div class="col-span-1">
                    <Label for="password_confirmation" class="mb-2" required>Confirm Password</Label>
                    <Input id="password_confirmation" v-model="form.password_confirmation" type="password" placeholder="Confirm Password" />
                    <p v-if="page.props.errors.password_confirmation" class="mt-1 text-xs text-red-500">
                        {{ page.props.errors.password_confirmation }}
                    </p>
                </div>
                <div class="col-span-4">
                    <Label for="roles" class="mb-4">Roles</Label>
                    <div class="grid grid-cols-4 gap-4">
                        <div v-for="role in roles" :key="role.id" class="flex items-center gap-2">
                            <Checkbox
                                :id="`role-${role.id}`"
                                :model-value="form.roles.includes(role.name)"
                                @update:model-value="handleRoleChange($event, role.name)"
                            />
                            <Label :for="`role-${role.id}`" class="uppercase">{{ role.name }}</Label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
