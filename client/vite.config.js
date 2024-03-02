import { defineConfig } from 'vite'
import path from 'path'

const BASE_URL = 'http://localhost:3000'

export default defineConfig({
    resolve: {
        alias: {
            '@': "/src",
            '~@': "/src",
        }
    },
    server: {
        proxy: {
            "/login": BASE_URL + "/views/login",
        }
    }
})