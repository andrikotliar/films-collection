import { AdminFilmWithRelations } from 'src/modules/films/types';

const getIds = () => {};

export const mapAdminFilmDetails = (film: AdminFilmWithRelations) => {
  const {} = film;

  return {
    ...film,
    shouldUseExistingKey: film.chapterKey !== null,
  };
};
