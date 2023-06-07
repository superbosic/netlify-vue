import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const apiPath = process.env.VITE_API_PATH;

  return defineConfig({
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: 'src/styles/quasar.variables.sass',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@web3auth/modal': path.resolve(__dirname, './node_modules/@web3auth/modal/dist/modal.umd.min.js'),
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
        '^/ethers': {
          target: apiPath,
          changeOrigin: true,
        },
      },
    },
  });
};
