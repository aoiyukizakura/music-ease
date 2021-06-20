import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: true,
    hmr: {
      overlay: true
    },
    port: 3030
  },
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src'),
      '/@style': resolve(__dirname, 'src/assets/style'),
      '/@views': resolve(__dirname, 'src/views'),
      '/@cp': resolve(__dirname, 'src/components'),
    }
  },
  base: './'
})
