import { defineConfig } from 'vite';
import path from 'path';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue2({
            jsx: true,
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    build: {
        brotliSize: false,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/variables.scss";`,
            },
        },
    },
});
