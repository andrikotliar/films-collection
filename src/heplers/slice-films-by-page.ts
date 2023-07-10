import { filmsSettings } from "@/constants";
import { FilmData } from "@/types";

export const sliceFilmsByPage = (
  films: FilmData[],
  currentPage: number,
  perPage = filmsSettings.perPage
) => {
  const from = currentPage * perPage - perPage;
  const to = currentPage * perPage;
  return {
    list: films.slice(from, to),
    from,
    to
  };
};