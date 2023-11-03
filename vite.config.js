import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Contoh: Menentukan port kustom
    port: 3000,
  },
  build: {
    // Contoh: Menentukan direktori output kustom
    outDir: 'dist',
  },
  // Tambahkan konfigurasi tambahan sesuai kebutuhan Anda
});
