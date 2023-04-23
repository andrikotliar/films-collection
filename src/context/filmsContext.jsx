import { filterFilms, pager } from '../heplers';
import { createContext, useContext, useEffect, useState } from 'react';
import { useFilter } from '@/hooks/useFilter';

const FilmsContext = createContext();

export const useFilmsContext = () => useContext(FilmsContext);

const FilmsProvider = ({ children }) => {
  const [ initialFilmsList, setInitialFilmsList ] = useState([]);
  const [ filmsCount, setFilmsCount ] = useState(0);
  const [ films, setFilms ] = useState([]);
  const [ isFilmsLoading, setIsFilmsLoading ] = useState(true);
  const [ filterParams, setSearchParams ] = useFilter();
  const [ pageData, setPageData ] = useState({
    from: 0,
    to: 24
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
      window.scrollTo(0, 0);
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

  const updateFilter = (data, dirtyFields) => {
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

  const setPage = (page) => {
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