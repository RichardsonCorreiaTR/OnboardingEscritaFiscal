/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PAT opcional (ex.: leitura de Issues) para maior limite da API do GitHub. */
  readonly VITE_GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
