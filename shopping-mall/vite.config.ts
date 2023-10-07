import { defineConfig } from 'vite'
import withReactRouter from 'vite-plugin-next-react-router';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    withReactRouter({
      pageDir: "src/pages",
      extensions: ["js", "jsx", "ts", "tsx"],
      layout: "_layout",
    }),
  ],
})
