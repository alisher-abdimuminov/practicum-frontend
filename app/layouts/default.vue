<script setup lang="ts">
import { LucideCalendarCheck, LucideCalendarCheck2, LucideHome, LucideListCheck, LucideLogOut, LucideMapPin, LucideMoon, LucideShield, LucideSun, LucideUpload, LucideUser, LucideUsers } from 'lucide-vue-next';


const { theme } = useTheme();
const { user, logout } = useAuth();
</script>

<template>
    <div>
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader class="h-[3rem] border-b flex justify-center">
                    <p>Practicum</p>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup />
                        <SidebarGroupLabel>Asosiy</SidebarGroupLabel>
                        <SidebarGroupContent class="px-2">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton as-child :is-active="$route.name === 'index'">
                                        <NuxtLink :to="{ name: 'index' }">
                                            <LucideHome />
                                            <span>Bosh sahifa</span>
                                        </NuxtLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <template v-if="user?.role === 'admin' || user?.role === 'marketing'">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'admin-students'">
                                            <NuxtLink :to="{ name: 'admin-students' }">
                                                <LucideUsers />
                                                <span>Talabalar</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'admin-areas'">
                                            <NuxtLink :to="{ name: 'admin-areas' }">
                                                <LucideMapPin />
                                                <span>Joylashuvlar</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'admin-attendance'">
                                            <NuxtLink :to="{ name: 'admin-attendance' }">
                                                <LucideCalendarCheck />
                                                <span>Davomat</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'admin-schedule'">
                                            <NuxtLink :to="{ name: 'admin-schedule' }">
                                                <LucideCalendarCheck2 />
                                                <span>Dars jadvali</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </template>
                                <template v-if="user?.role === 'teacher'">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'teacher-tasks'">
                                            <NuxtLink :to="{ name: 'teacher-tasks' }">
                                                <LucideListCheck />
                                                <span>Topshiriqlar</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'teacher-submits'">
                                            <NuxtLink :to="{ name: 'teacher-submits' }">
                                                <LucideUpload />
                                                <span>Yuklamalar</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'teacher-attendance'">
                                            <NuxtLink :to="{ name: 'teacher-attendance' }">
                                                <LucideCalendarCheck />
                                                <span>Davomat</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </template>
                                <template v-if="user?.role === 'student'">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'student-tasks'">
                                            <NuxtLink :to="{ name: 'student-tasks' }">
                                                <LucideListCheck />
                                                <span>Topshiriqlar</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'student-submits'">
                                            <NuxtLink :to="{ name: 'student-submits' }">
                                                <LucideUpload />
                                                <span>Yuklamalar</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton as-child :is-active="$route.name === 'student-attendace'">
                                            <NuxtLink :to="{ name: 'student-attendance' }">
                                                <LucideCalendarCheck />
                                                <span>Davomat</span>
                                            </NuxtLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </template>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            <main class="w-full">
                <div class="w-full h-[3rem] border-b flex items-center justify-between px-2">
                    <SidebarTrigger />
                    <div class="flex items-center gap-1">
                        <Button variant="ghost" @click="() => { theme === 'dark' ? theme = 'light' : theme = 'dark' }">
                            <LucideSun v-if="theme === 'dark'" />
                            <LucideMoon v-else />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="icon">
                                    <LucideUser />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-56">
                                <DropdownMenuItem>
                                    <LucideUser />
                                    {{ user?.full_name }}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LucideShield />
                                    <span v-if="user?.role === 'admin'">Admin</span>
                                    <span v-else-if="user?.role === 'marketing'">Marketing</span>
                                    <span v-else-if="user?.role === 'student'">Talaba</span>
                                    <span v-else-if="user?.role === 'teacher'">O'qituvchi</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem @click="logout">
                                    <LucideLogOut />
                                    <span>Chiqish</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <slot />
            </main>
        </SidebarProvider>
    </div>
</template>