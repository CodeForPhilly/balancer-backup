import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export const API_BASE_URL = process.env.VITE_API_BASE_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: "0.0.0.0",
    strictPort: true,
    port: 3000,
  },
});
