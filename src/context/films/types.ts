import { FilmData, Related } from '@/common/types';

enum FilmsActionType {
  SET_FILMS_LIST = 'SET_FILMS_LIST',
  START_LOADING = 'START_LOADING',
}

type FilmsState = {
  initialFilmsList: FilmData[] | null;
  films: FilmData[];
  isFilmsLoading: boolean;
  pagesCount: number;
  relatedFilmsList: Related | null;
};

type TypeOnlyAction<T> = {
  type: T;
};

type Action<T, K extends keyof FilmsState> = {
  type: T;
  payload: Pick<FilmsState, K>;
};

type SetFilmsList = Action<
  FilmsActionType.SET_FILMS_LIST,
  'pagesCount' | 'films'
>;

type StartLoading = TypeOnlyAction<FilmsActionType.START_LOADING>;

type FilmsActions = SetFilmsList | StartLoading;

export { type FilmsActions, type FilmsState, FilmsActionType };
