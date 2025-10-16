export default defineNuxtRouteMiddleware((from, to) => {
    const { user } = useAuth();

    if (user.value?.role !== "student") {
        return navigateTo("/");
    }
});