import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
    // Add this 'server' block to make Vite work with ngrok
    // server: {
    //     hmr: {
    //         host: "cardinal-star-dove.ngrok-free.app",
    //     },
    // },
});
