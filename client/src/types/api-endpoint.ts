export type ApiEndpoint =
  | '/films'
  | '/films/:filmId'
  | '/films/search'
  | '/films/admin'
  | '/initial-data'
  | '/pending-films'
  | '/pending-films/:filmId'
  | '/auth/login'
  | '/auth/refresh'
  | '/auth/logout'
  | '/collection-events'
  | '/collection-events/:eventId'
  | '/collection-events/admin/list'
  | '/files';
