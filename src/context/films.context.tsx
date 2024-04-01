import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { filterFilms } from '@/helpers';
import { useQueryFilter } from '@/hooks';
import { PER_PAGE } from '@/common/constants';
import { fetchAllFilms, fetchRelatedFilmsList } from '@/api';
import { filmsReducer, initialFilmsState } from './films/reducer';
import { FilmsActionType } from '@/context/films/types';

const FilmsContext = createContext(initialFilmsState);

const useFilmsContext = () => useContext(FilmsContext);

const FilmsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(filmsReducer, initialFilmsState);

  const { initialFilmsList } = state;

  const { filterParams } = useQueryFilter();

  const fetchFilms = async () => {
    const initialFilmsList = await fetchAllFilms();
    const relatedFilmsList = await fetchRelatedFilmsList();

    dispatch({
      type: FilmsActionType.INIT_FILMS_LIST,
      payload: {
        initialFilmsList,
        relatedFilmsList,
      },
    });
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    dispatch({ type: FilmsActionType.START_LOADING });

    if (initialFilmsList.length) {
      const { pageIndex = 0, ...params } = filterParams;
      const filteredFilms = filterFilms(initialFilmsList, params);
      const pageIndexNum = Number(pageIndex);

      const sliceStart = PER_PAGE * pageIndexNum;
      const sliceEnd = PER_PAGE * (pageIndexNum + 1);

      const films = filteredFilms.slice(sliceStart, sliceEnd);
      const pagesCount = Math.ceil(filteredFilms.length / PER_PAGE);

      dispatch({
        type: FilmsActionType.SET_FILMS_LIST,
        payload: { pagesCount, films },
      });
    }
  }, [initialFilmsList, filterParams]);

  return (
    <FilmsContext.Provider value={state}>{children}</FilmsContext.Provider>
  );
};

export { FilmsProvider, useFilmsContext };
