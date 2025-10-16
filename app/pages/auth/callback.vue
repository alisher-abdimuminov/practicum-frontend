<script setup lang="ts">
import type { Response, User } from '~/types';


const { setUser } = useAuth();
const route = useRoute();
const error = ref();
const runtimeConfig = useRuntimeConfig();


onMounted(async() => {
    let response = await $fetch<Response<User>>(runtimeConfig.public.api + "auth/hemis/callback/", {
        method: "POST",
        body: JSON.stringify({
            "code": route.query.code,
            "type": useCookie("type").value
        })
    });

    if (response.status === "error") {
        error.value = response.data;
        navigateTo({ name: "auth-login" });
    } else {
        setUser(response.data);
        navigateTo({ name: "index" });
    }
});
</script>

<template>
    <div>
        Kuting...
        {{ error }}
    </div>
</template>