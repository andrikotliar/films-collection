/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ACTOR_IMAGES_URL: string;
  VITE_POSTER_IMAGES_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
