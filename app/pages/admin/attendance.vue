<script setup lang="ts">
definePageMeta({
    middleware: ["is-auth", "is-admin"],
});
</script>

<template>
    <div>
        Attendance
    </div>
</template>