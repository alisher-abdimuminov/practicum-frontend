import { defineNuxtPlugin } from "#app";
import type { Response, User } from "~/types";


export default defineNuxtPlugin((nuxtApp) => {

    const runtimeConfig = useRuntimeConfig();

    const { user, setUser } = useAuth();

    if (user.value) {
        nuxtApp.hook("app:created", async () => {
            const { status, data } = await useAsyncData(
                "profile",
                () => $fetch<Response<User>>(runtimeConfig.public.api + "profile/", {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${user.value?.token}`,
                    },
                })
            )
            if (status.value == "success") {
                if (data.value) {
                    if (data.value.status === "error") {
                        setUser(null);
                    } else {
                        setUser(data.value.data)
                    }
                }
            }
        });
    }
});