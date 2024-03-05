/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  console.log(`Configured mode: ${mode}`);
  let baseConfig: Partial<UserConfig> = {
    plugins: [react()],
    test: {
      name: 'jsdom',
      environment: 'jsdom',
      root: './test',
      globals: true,
      browser: {
        enabled: true,
        headless: true,
        name: 'chrome'
      },
      deps: {
        optimizer: {
          web: {
            include: ['vitest-canvas-mock']
          }
        }
      },
      setupFiles: ['./test/setupTests.js'],
      poolOptions: {
        threads: {
          singleThread: true,
        },
      },
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
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
	      formats: ['iife'],
      	fileName: "module",
      },
      emptyOutDir: false
    };
    return baseConfig as UserConfig;
  }

  return baseConfig as UserConfig;
});
