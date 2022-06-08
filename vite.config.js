import path from 'path';
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/checkout.jsx'),
      formats: ['es', 'iife', 'umd'],
      name: 'SubmarineCheckout',
      fileName: (format) => format === 'iife' ? 'submarine-checkout.js' : `submarine-checkout.${format}.js`
    }
  },
  plugins: [
    preact()
  ]
});