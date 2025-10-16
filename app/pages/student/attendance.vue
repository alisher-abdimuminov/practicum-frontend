<script setup lang="ts">
definePageMeta({
    middleware: ["is-auth", "is-student"],
});
</script>

<template>
    <div>
        Student attendance
    </div>
</template>