import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Removed the invalid line

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
