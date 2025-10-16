<script setup lang="ts">
import { LucideFile } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import type { Response, Submit } from '~/types';

definePageMeta({
    middleware: ["is-auth", "is-student"],
});


const runtimeConfig = useRuntimeConfig();

const { user } = useAuth();

const isLoading = ref(true);
const submits = ref<Submit[]>([]);


const getStudents = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Submit[]>>(runtimeConfig.public.api + "student/submits/", {
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: response.data
        });
    } else {
        submits.value = response.data;
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
                        <TableHead>Topshiriq</TableHead>
                        <TableHead>Talaba</TableHead>
                        <TableHead>Holati</TableHead>
                        <TableHead>Baho</TableHead>
                        <TableHead>File</TableHead>
                        <TableHead>Yaratilgan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="submit in submits">
                        <TableCell>{{ submit.task.name }}</TableCell>
                        <TableCell>{{ submit.student.full_name }}</TableCell>
                        <TableCell>{{ submit.status }}</TableCell>
                        <TableCell>{{ submit.point }}</TableCell>
                        <TableCell>
                            <NuxtLink :to="runtimeConfig.public.base + submit.file" :external="true"><LucideFile :size="15" /> </NuxtLink>
                        </TableCell>
                        <TableCell>{{ submit.created }}</TableCell>
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