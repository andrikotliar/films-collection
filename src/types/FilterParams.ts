import { FilmType } from "@/types/Film"

type ExtendedFilmType = FilmType & {
  search: string;
  page: string;
  actorName: string;
  actorId: string;
};

export type FilterParams = { [key in keyof ExtendedFilmType]: any };
