export const FilmStatus = {
  ADDED: 'ADDED',
  WATCHED: 'WATCHED',
  PLANNED: 'PLANNED',
} as const;

export const ExtendedFilmStatus = {
  ...FilmStatus,
  UPCOMING: 'UPCOMING',
} as const;
