<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { Area, Response } from '~/types';

definePageMeta({
    middleware: ["is-auth", "is-admin"],
});


const runtimeConfig = useRuntimeConfig();
const { user } = useAuth();

const isLoading = ref(true);
const areas = ref<Area[]>([]);
const area = ref<Area>({
    pk: 1,
    name: "",
    coord1: "",
    coord2: "",
    coord3: "",
    coord4: "",
});


const getAreas = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Area[]>>(runtimeConfig.public.api + "admin/areas/", {
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: response.data
        });
    } else {
        areas.value = response.data;
    }
    isLoading.value = false;
}

const addArea = async () => {
    let response = await $fetch(runtimeConfig.public.api + "admin/areas/add/", {
        method: "POST",
        body: JSON.stringify({
            "name": area.value.name,
            "coord1": area.value.coord1,
            "coord2": area.value.coord2,
            "coord3": area.value.coord3,
            "coord4": area.value.coord4,
        })
    });

    getAreas();
}

onMounted(() => {
    isLoading.value = false;
    getAreas();
});
</script>

<template>
    <div class="p-5 md:p-10 grid gap-5">
        <div class="flex items-center justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button>
                        Joylashuv qo'shish
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi joylashuv qo'shish</DialogTitle>
                        <DialogDescription>...</DialogDescription>
                    </DialogHeader>
                    <div class="space-y-2">
                        <Label>Nomi</Label>
                        <Input v-model="area.name" />
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label>Kordinata 1</Label>
                                <Input v-model="area.coord1" />
                            </div>
                            <div>
                                <Label>Kordinata 2</Label>
                                <Input v-model="area.coord2" />
                            </div>
                            <div>
                                <Label>Kordinata 3</Label>
                                <Input v-model="area.coord3" />
                            </div>
                            <div>
                                <Label>Kordinata 4</Label>
                                <Input v-model="area.coord4" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button @click="addArea">Saqlash</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Kordinata 1</TableHead>
                        <TableHead>Kordinata 2</TableHead>
                        <TableHead>Kordinata 3</TableHead>
                        <TableHead>Kordinata 4</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="area in areas">
                        <TableCell>{{ area.name }}</TableCell>
                        <TableCell>{{ area.coord1 }}</TableCell>
                        <TableCell>{{ area.coord2 }}</TableCell>
                        <TableCell>{{ area.coord3 }}</TableCell>
                        <TableCell>{{ area.coord4 }}</TableCell>
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