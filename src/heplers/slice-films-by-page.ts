import { GeneralFilm } from "@/types";

export const sliceFilmsByPage = (
  films: GeneralFilm[],
  currentPage: number,
  perPage = 25
) => {
  const from = currentPage * perPage - perPage;
  const to = currentPage * perPage;
  return {
    list: films.slice(from, to),
    from,
    to
  };
};