import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { svgBuilder } from './src/plugins/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/assets/icons/')
  ],
  server: {
    cors: true,
    hmr: {
      overlay: true
    },
    port: 3030,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src'),
      '/@style': resolve(__dirname, 'src/assets/style'),
      '/@views': resolve(__dirname, 'src/views'),
      '/@cp': resolve(__dirname, 'src/components'),
    },
  },
  base: process.env.NODE_ENV === "development" ? '/' : '/music-ease/',
  css: {
    postcss: "./postcss.config.js"
  }
})
