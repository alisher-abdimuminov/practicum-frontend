<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
</script>

<template>
    <div>
        <ClientOnly>
            <Toaster />
        </ClientOnly>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
