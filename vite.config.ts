import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  base: './SporThick.HIIT-o-Maniac/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@tailwind base; @tailwind components; @tailwind utilities;`,
      }
    }
  }
})
