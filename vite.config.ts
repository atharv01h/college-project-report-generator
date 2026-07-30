import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large libraries into separate chunks for better caching
          react: ['react', 'react-dom'],
          gemini: ['@google/generative-ai'],
          export: ['jspdf', 'docx', 'file-saver'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-markdown', 'lucide-react'],
  },
});
