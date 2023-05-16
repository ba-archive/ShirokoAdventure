import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import px2rem from 'postcss-plugin-px2rem';
import postcssPresetEnv from 'postcss-preset-env';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import clearConsole from 'vite-plugin-clear-console';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        px2rem({
          rootValue: 16,
          propBlackList: ['font-size', 'border', 'border-width'],
          exclude: /(node_module)/,
        }),
      ],
    },
  },
  plugins: [
    vue(),
    legacy({
      targets: [
        'Android >= 39',
        'Chrome >= 50',
        'Safari >= 10.1',
        'iOS >= 10.3',
        '> 1%',
      ],
    }),
    VitePWA({
      injectRegister: 'auto',
      includeManifestIcons: true,
      registerType: 'autoUpdate', // 完了，已经部署点开的人更新不了了，，，
      includeAssets: ['favicon/*.png'],
      manifest: {
        name: '白子的基沃托斯骑行大冒险',
        short_name: '白子的大冒险',
        description: '白子的基沃托斯骑行大冒险',
        lang: 'zh-CN',
        theme_color: '#62abe9',
        icons: [
          {
            src: '/favicon/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/favicon/maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
        ],
      },
      // uncomment to unregister service worker
      selfDestroying: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      toplevel: true,
      safari10: true,
    },
  },
});
