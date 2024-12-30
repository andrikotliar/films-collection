export type EnvVariables = {
  PORT: number;
  MONGODB_URI: string;
  AUTH_SECRET: string;
  COOKIE_SECRET: string;
  HOST?: string;
  NODE_ENV?: string;
  FRONTEND_ORIGIN?: string;
};
