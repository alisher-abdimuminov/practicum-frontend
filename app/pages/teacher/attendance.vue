<script setup lang="ts">
definePageMeta({
    middleware: ["is-auth", "is-teacher"],
});
</script>

<template>
    <div>
        Teacher attendance
    </div>
</template>