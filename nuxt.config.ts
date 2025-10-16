import tailwindcss from '@tailwindcss/vite'


export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ["~/assets/css/tailwind.css",],

    vite: {
        plugins: [
            tailwindcss()
        ]
    },

    modules: ['shadcn-nuxt', '@pinia/nuxt'],

    shadcn: {
        prefix: "",
    },

    runtimeConfig: {
        public: {
            base: "",
            api: "",
            hemisTeacherURL: "",
            hemisStudentURL: "",
            hemisClientID: "",
            hemisClientSecret: "",
            hemisRedirectUri: "",
        }
    },

    devServer: {
        host: "0.0.0.0",
        port: 3000
    }
})