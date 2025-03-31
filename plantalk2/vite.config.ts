import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // これを追加！
    port: 5174,       // 正しいポートを指定
    strictPort: true,
    allowedHosts: ["*"], 
  },
  optimizeDeps: {
    
    include: ["swiper"], // ここに 'swiper' を追加
  },
})
