export type ApiEndpoint =
  | '/films'
  | '/films/:filmId'
  | '/films/search'
  | '/films/admin'
  | '/films/chapters'
  | '/initial-data'
  | '/pending-films'
  | '/pending-films/:filmId'
  | '/auth/login'
  | '/auth/refresh'
  | '/auth/logout'
  | '/collection-events'
  | '/collection-events/:eventId'
  | '/collection-events/admin/list'
  | '/files'
  | '/people'
  | '/people/search'
  | '/awards/nominations'
  | '/chapter-keys'
  | '/chapter-keys/options'
  | '/posts'
  | '/posts/:id'
  | '/posts/page/:key'
  | '/posts/admin';
