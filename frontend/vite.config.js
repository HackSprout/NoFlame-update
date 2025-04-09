// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     strictPort: true,
//     host: "0.0.0.0"
//   }
// });


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from `.env` file
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      host: "0.0.0.0",
      proxy: {
        // If backend is running on localhost:5000, proxy API requests
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    define: {
      // Make environment variables available in code (e.g., `import.meta.env.VITE_WEATHER_API_KEY`)
      'process.env': {
        VITE_WEATHER_API_KEY: env.VITE_WEATHER_API_KEY,
      }
    },
    build: {
      outDir: 'dist', // Where production build will be stored
      sourcemap: false, // No source maps in production
    }
  };
});

