/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_MEDIA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
