import { FilmType } from "@/types";

export const pager = (
  films: FilmType[],
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