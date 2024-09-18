/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_ACTOR_PHOTOS_URL: string;
  readonly VITE_BASE_POSTERS_URL: string;
  readonly VITE_BASE_CHARACTER_IMAGES_URL: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
