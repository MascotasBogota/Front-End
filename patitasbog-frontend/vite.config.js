import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite'; // <--- ¡Asegúrate de que esta línea NO esté o esté comentada!

export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(), // <--- ¡Y que esta línea NO esté o esté comentada!
  ],
});