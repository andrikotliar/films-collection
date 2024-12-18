export type ApiEndpoint =
  | '/films'
  | '/films/anniversaries'
  | `/films/${string}`
  | '/films/search'
  | '/initial-data'
  | '/pending-films'
  | '/auth/login'
  | '/auth/refresh';
