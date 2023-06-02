import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { filterFilms, pager } from '@/heplers';
import { useFilter } from '@/hooks';
import { filmsSettings } from '@/constants';
import { FilmType } from '@/types';

type FilmsContextType = {
  initialFilmsList: FilmType[];
  films: FilmType[];
  isFilmsLoading: boolean;
  filmsCount: number;
  filterParams: { [key: string]: any };
  pageData: {
    from: number;
    to: number;
  };
  getCurrentPage(): number;
  setPage(page: number): void;
  updateFilter(data: any, dirtyFields: any): void;
  resetFilter(): void;
}

const FilmsContext = createContext<FilmsContextType>({} as FilmsContextType);

export const useFilmsContext = () => useContext(FilmsContext);

const FilmsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ initialFilmsList, setInitialFilmsList ] = useState<FilmType[]>([]);
  const [ filmsCount, setFilmsCount ] = useState(0);
  const [ films, setFilms ] = useState<FilmType[]>([]);
  const [ isFilmsLoading, setIsFilmsLoading ] = useState(true);
  const [ filterParams, setSearchParams ] = useFilter();
  const [ pageData, setPageData ] = useState({
    from: 0,
    to: filmsSettings.perPage
  });

  const fetchFilms = async () => {
    const response = await fetch('/database/database.json');
    const films = await response.json();
    setInitialFilmsList(films);
    setFilmsCount(films.length);
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    if(initialFilmsList.length) {
      const filteredFilms = filterFilms(initialFilmsList, filterParams);
      setFilmsCount(filteredFilms.length);
      const pageData = pager(filteredFilms, filterParams.page || 1);
      setFilms(pageData.list);
      setPageData({
        from: pageData.from,
        to: pageData.to,
      });
      setIsFilmsLoading(false);
    }
  }, [initialFilmsList, filterParams]);

  const updateFilter = (data: any, dirtyFields: any) => {
    const params = {
      ...filterParams,
    };
    Object.keys(dirtyFields).forEach(field => {
      params[field] = data[field];
    });
    setSearchParams({
      ...params,
      page: 1
    });
  };

  const resetFilter = () => {
    setSearchParams({});
  };

  const getCurrentPage = () => {
    const currentPage = Number(filterParams.page);
    if(currentPage) {
      return currentPage;
    }
    return 1;
  }

  const setPage = (page: number) => {
    setSearchParams({ ...filterParams, page });
  };

  return (
    <FilmsContext.Provider value={{
      initialFilmsList,
      films,
      isFilmsLoading,
      filmsCount,
      filterParams,
      pageData,
      getCurrentPage,
      setPage,
      updateFilter,
      resetFilter,
    }}>
      {children}
    </FilmsContext.Provider>
  );
};

export default FilmsProvider;