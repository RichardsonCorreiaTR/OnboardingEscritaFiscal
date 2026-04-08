import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/onboardingpescrita/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Evita CORS no dev ao ler o índice Apache das versões Domínio
      "/dominio-atualizacao": {
        target: "https://download.dominiosistemas.com.br",
        changeOrigin: true,
        rewrite: () => "/atualizacao/contabil/",
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
