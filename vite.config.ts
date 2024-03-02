/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  console.log(mode.mode)
  let baseConfig = {
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
      }
    }
  }
  if(mode === "module" || mode.mode === "module"){
     baseConfig.build = {
      lib: {
        entry: resolve(__dirname, 'src/components/MapCanvas.component.js'),
      	name: 'ESnet Network Map',
      	fileName: "esnet-network-map",
	emptyOutDir: false
      }
    };
    return baseConfig
  }
  if(mode === "grafana" || mode.mode === "grafana"){
     baseConfig.build = {
      lib: {
        entry: resolve(__dirname, 'src/module.ts'),
      	name: 'GrafanaESnetNetworkMap',
	formats: ['iife'],
      	fileName: "module",
	emptyOutDir: false
      }
    };
    return baseConfig
  }
});

