import { FilmsActionType, FilmsActions, FilmsState } from './types';

const initialFilmsState: FilmsState = {
  initialFilmsList: null,
  films: [],
  isFilmsLoading: true,
  pagesCount: 0,
  relatedFilmsList: null,
};

const filmsReducer = (
  state = initialFilmsState,
  action: FilmsActions,
): FilmsState => {
  switch (action.type) {
    case FilmsActionType.SET_FILMS_LIST: {
      return {
        ...state,
        ...action.payload,
        isFilmsLoading: false,
      };
    }
    case FilmsActionType.START_LOADING: {
      return {
        ...state,
        isFilmsLoading: true,
      };
    }
    default:
      return state;
  }
};

export { filmsReducer, initialFilmsState };
