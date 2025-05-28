<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Permission } from '@/types';
import { router, useForm } from '@inertiajs/vue3';
import { Check, Pencil, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const props = defineProps<{
    permission: Permission;
}>();

const form = useForm({
    name: props.permission.name,
});

const isEditMode = ref(false);

const savePermission = () => {
    form.put(route('admin.permissions.update', props.permission.id), {
        method: 'put',
        preserveScroll: true,
        onSuccess: () => {
            toast.success(`Permission ${props.permission.name} updated successfully!`);
            isEditMode.value = false;
        },
        onError: (errors) => {
            toast.error(`Failed to update permission ${props.permission.name}. Please try again.`);
            console.error(errors);
        },
    });
};
</script>

<template>
    <div class="flex min-h-14 items-center gap-2 rounded-lg border border-gray-200 px-4 py-2">
        <div class="grow" v-if="isEditMode">
            <Input v-model="form.name" class="w-full" />
        </div>
        <div v-else class="grow font-medium">
            {{ form.name }}
        </div>
        <Button v-if="isEditMode" @click="savePermission" size="icon">
            <Check class="size-4" />
        </Button>
        <Button v-else @click="isEditMode = !isEditMode" size="icon">
            <Pencil class="size-4" />
        </Button>
        <Button variant="destructive" size="icon" @click="$emit('delete', permission)">
            <Trash2 class="size-4" />
        </Button>
    </div>
</template>
