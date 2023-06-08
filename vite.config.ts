import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => ['stripe-pricing-table'].includes(tag),
                },
            },
        }),
    ],
    server: {
        host: true,
    },
})
