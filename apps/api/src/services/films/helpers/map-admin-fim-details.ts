export const mapAdminFilmDetails = (film: Record<string, unknown>) => {
  return {
    ...film,
    shouldUseExistingKey: film.chapterKey !== null,
  };
};
