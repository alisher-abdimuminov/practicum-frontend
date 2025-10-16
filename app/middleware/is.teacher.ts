export default defineNuxtRouteMiddleware((from, to) => {
    const { user } = useAuth();

    if (user.value && user.value.role !== "teacher") {
        return navigateTo("/");
    }
});
