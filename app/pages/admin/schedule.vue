<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { Area, Group, Response, Schedule } from '~/types';
import { ListboxContent, ListboxItem, ListboxRoot } from "reka-ui";

definePageMeta({
    middleware: ["is-auth", "is-admin"],
});


const runtimeConfig = useRuntimeConfig();

const { user } = useAuth();

const isLoading = ref(true);
const areas = ref<Area[]>([]);
const selectedGroups = ref([]);
const groups = ref<Group[]>([]);
const schedules = ref<Schedule[]>([]);


const getStudents = async () => {
    isLoading.value = true;
    let response = await $fetch<Response<Schedule[]>>(runtimeConfig.public.api + "admin/schedules/", {
        headers: {
            Authorization: `Token ${user.value?.token}`
        }
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: response.data
        });
    } else {
        schedules.value = response.data;
    }
    isLoading.value = false;
}

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


onMounted(() => {
    isLoading.value = false;
    getStudents();
    getAreas();
    getGroups();
});
</script>

<template>
    <div class="p-5 md:p-10 grid gap-5">
        <div class="flex items-center justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button>Dars qo'shis</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi dars qo'shish</DialogTitle>
                        <DialogDescription>...</DialogDescription>
                    </DialogHeader>
                    <div class="space-y-3"><Label>Guruhlar</Label>
                        <ListboxRoot class="border-input overflow-hidden rounded-md border" multiple v-model="selectedGroups">
                            <ListboxContent
                                class="bg-background max-h-72 min-h-20 space-y-1 overflow-auto p-1 text-sm shadow-xs transition-[color,box-shadow]"
                                aria-label="Select framework">
                                <ListboxItem v-for="option in groups" :key="option.pk" :id="option.pk" :value="option.pk"
                                    class="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[highlighted]:bg-accent/50 data-[highlighted]:text-accent-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 relative rounded px-2 py-1.5 outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-visible:ring-[3px]">
                                    {{ option.name }}
                                </ListboxItem>
                            </ListboxContent>
                        </ListboxRoot>
                        <Label>Joylashuv</Label>
                        <Select>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Joylashuvni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="area in areas" :value="area.pk">{{ area.name }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>Hafta kuni</Label>
                        <Select>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Joylashuvni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monday">Dushanba</SelectItem>
                                <SelectItem value="tuesday">Seshanba</SelectItem>
                                <SelectItem value="wednesday">Chorshanba</SelectItem>
                                <SelectItem value="thursday">Payshanba</SelectItem>
                                <SelectItem value="friday">Juma</SelectItem>
                                <SelectItem value="saturday">Shanba</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button>Saqlash</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Guruhlar</TableHead>
                        <TableHead>Joylashuv</TableHead>
                        <TableHead>Hafta kuni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="schedule in schedules">
                        <TableCell>
                            <div class="flex flex-col gap-2">
                                <Badge variant="secondary" v-for="group in schedule.groups">{{ group.name }}</Badge>
                            </div>
                        </TableCell>
                        <TableCell>{{ schedule.area.name }}</TableCell>
                        <TableCell>
                            <Badge class="rounded-full" v-if="schedule.weekday === 'monday'">Dushanba</Badge>
                            <Badge class="rounded-full" v-else-if="schedule.weekday === 'tuesday'">Seshanba</Badge>
                            <Badge class="rounded-full" v-else-if="schedule.weekday === 'wednesday'">Chorshanba</Badge>
                            <Badge class="rounded-full" v-else-if="schedule.weekday === 'thursday'">Payshanba</Badge>
                            <Badge class="rounded-full" v-else-if="schedule.weekday === 'friday'">Juma</Badge>
                            <Badge class="rounded-full" v-else-if="schedule.weekday === 'saturday'">Shanba</Badge>
                        </TableCell>
                    </TableRow>
                    <TableRow v-if="isLoading" v-for="_ in 10">
                        <TableCell>
                            <Skeleton class="h-4 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton class="h-4 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton class="h-4 w-full" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>