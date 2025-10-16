<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { Group, Response, Task } from '~/types';

definePageMeta({
    middleware: ["is-auth", "is-teacher"],
});


const runtimeConfig = useRuntimeConfig();

const { user } = useAuth();

const isLoading = ref(true);
const tasks = ref<Task[]>([]);
const groups = ref<Group[]>([]);
const taskName = ref("");
const taskDescription = ref("");
const taskGroup = ref("");


const getTasks = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Task[]>>(runtimeConfig.public.api + "teacher/tasks/", {
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

const getGroups = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Group[]>>(runtimeConfig.public.api + "admin/groups/", {
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: response.data
        });
    } else {
        groups.value = response.data;
    }
    isLoading.value = false;
}

const addTask = async () => {
    let response = await $fetch(runtimeConfig.public.api + "teacher/tasks/add/", {
        method: "POST",
        body: JSON.stringify({
            "name": taskName.value,
            "description": taskDescription.value,
            "group": taskGroup.value
        }),
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    getTasks();
}


onMounted(() => {
    isLoading.value = false;
    getTasks();
    getGroups();
});
</script>

<template>
    <div class="p-5 md:p-10 grid gap-5">
        <div class="flex items-center justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button>Topshiriq qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi topshiriq qo'shish</DialogTitle>
                        <DialogDescription>...</DialogDescription>
                    </DialogHeader>
                    <div class="space-y-2">
                        <Label>Nomi</Label>
                        <Input v-model="taskName" />
                        <Label>Izox</Label>
                        <Input v-model="taskDescription" />
                        <Label>Guruh</Label>
                        <Select v-model="taskGroup">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Guruhni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="group in groups" :value="group.pk">{{ group.name }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button @click="addTask">Saqlash</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
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