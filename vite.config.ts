import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Подключаем React, чтобы Vite умел собирать JSX и быстро обновлять страницу.
export default defineConfig({
  plugins: [react()],
  build: {
    // Оставляем итоговые файлы читаемыми во время разработки и проверки.
    minify: false,
    cssMinify: false,
    sourcemap: true,
  },
});
