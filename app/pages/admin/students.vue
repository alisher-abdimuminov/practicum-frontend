<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { Response, Student } from '~/types';

definePageMeta({
    middleware: ["is-auth", "is-admin"],
});


const runtimeConfig = useRuntimeConfig();

const { user } = useAuth();

const isLoading = ref(true);
const students = ref<Student[]>([]);


const getStudents = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Student[]>>(runtimeConfig.public.api + "admin/students/", {
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: response.data
        });
    } else {
        students.value = response.data;
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
        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>HemisID</TableHead>
                        <TableHead>Ism</TableHead>
                        <TableHead>Guruh</TableHead>
                        <TableHead>Kurs</TableHead>
                        <TableHead>Fakultet</TableHead>
                        <TableHead>Payment method</TableHead>
                        <TableHead>GPA</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="student in students">
                        <TableCell>{{ student.username }}</TableCell>
                        <TableCell>{{ student.full_name }}</TableCell>
                        <TableCell>{{ student.group }}</TableCell>
                        <TableCell>{{ student.level }}</TableCell>
                        <TableCell>{{ student.faculty }}</TableCell>
                        <TableCell>{{ student.payment_method }}</TableCell>
                        <TableCell>{{ student.gpa }}</TableCell>
                    </TableRow>
                    <TableRow v-if="isLoading" v-for="_ in 10">
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton class="h-4 w-full" /></TableCell>
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