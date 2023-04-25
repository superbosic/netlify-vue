import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const apiPath = process.env.VITE_API_PATH;

  return defineConfig({
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '^/api': {
          target: apiPath,
          changeOrigin: true,
        },
        '^/signnow': {
          target: apiPath,
          changeOrigin: true,
        },
      },
    },
  });
};
