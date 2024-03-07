/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`Configured mode: ${mode}`);
  let baseConfig: Partial<UserConfig> = {
    plugins: [react()],
    test: {
      name: 'jsdom',
      environment: 'jsdom',
      root: './test',
      browser: {
        enabled: true,
        headless: true,
        name: 'chrome'
      },
    }
  };

  if (mode === "module") {
    baseConfig.build = {
      lib: {
        entry: resolve(__dirname, 'src/components/MapCanvas.component.js'),
        name: 'ESnet Network Map',
        fileName: "esnet-network-map",
      },
      emptyOutDir: false
    };
    return baseConfig as UserConfig;
  }

  if (mode === "grafana") {
    baseConfig.build = {
      lib: {
        entry: resolve(__dirname, 'src/module.ts'),
        name: 'GrafanaESnetNetworkMap',
        // formats: ['iife'],
        fileName: "module",
      },
      emptyOutDir: false,
    };
    baseConfig.resolve = {
      alias: [
        {
          find: /@grafana\/aws-sdk/,
          replacement: resolve(__dirname, 'node_modules', '@grafana', 'aws-sdk'),
        },
      ],
    };
    return baseConfig as UserConfig;
  }

  return baseConfig as UserConfig;
});
