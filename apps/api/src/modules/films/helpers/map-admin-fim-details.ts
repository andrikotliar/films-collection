export const mapAdminFilmDetails = (film: Record<string, unknown>) => {
  const {} = film;

  return {
    ...film,
    shouldUseExistingKey: film.chapterKey !== null,
  };
};
