/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_MEDIA_URL?: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_APP_TITLE_PREFIX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
