<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { Response, Task } from '~/types';

definePageMeta({
    middleware: ["is-auth", "is-student"],
});


const runtimeConfig = useRuntimeConfig();

const { user } = useAuth();

const isLoading = ref(true);
const tasks = ref<Task[]>([]);


const getStudents = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Task[]>>(runtimeConfig.public.api + "student/tasks/", {
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: response.data
        });
    } else {
        tasks.value = response.data;
    }
    isLoading.value = false;
}


onMounted(() => {
    isLoading.value = false;
    getStudents();
});
</script>

<template>
    <div class="p-5 md:p-10 grid gap-5">
        <div class="border rounded-md overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nomi</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Izox</TableHead>
                        <TableHead>O'qituvchi</TableHead>
                        <TableHead>Yaratilgan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="task in tasks">
                        <TableCell>{{ task.name }}</TableCell>
                        <TableCell>{{ task.group.name }}</TableCell>
                        <TableCell>{{ task.description }}</TableCell>
                        <TableCell>{{ task.teacher.full_name }}</TableCell>
                        <TableCell>{{ task.created }}</TableCell>
                    </TableRow>
                    <TableRow v-if="isLoading" v-for="_ in 10">
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>