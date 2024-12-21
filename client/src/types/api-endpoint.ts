export type ApiEndpoint =
  | '/films'
  | `/films/${string}`
  | '/initial-data'
  | '/pending-films'
  | `/pending-films/${string}`
  | '/auth/login'
  | '/auth/refresh';
