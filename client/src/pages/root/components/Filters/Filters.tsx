import styles from './Filters.module.css';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, ScrollableWrapper } from '@/ui';
import { FilterOptions } from './components';
import { countObjectKeys, filterValues } from '@/helpers';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { FilmsListFilters, FilterItem } from '@/types';
import { getRouteApi } from '@tanstack/react-router';
import { LocalStorage } from '@/services';

type FiltersProps = {
  config: FilterItem[];
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  updateFiltersCount: (value: number) => void;
};

const defaultValues: FilmsListFilters = {
  type: null,
  style: null,
  collectionId: null,
  genreIds: null,
  startDate: null,
  endDate: null,
  countryIds: null,
  studioIds: null,
  searchAnniversaries: false,
  searchLastVisitedFilms: false,
  ids: null,
};

const routeApi = getRouteApi('/');

export const Filters: FC<FiltersProps> = ({
  config,
  setIsFilterOpen,
  updateFiltersCount,
}) => {
  const navigate = routeApi.useNavigate();
  const routeSearch = routeApi.useSearch();

  const filtersCount = countObjectKeys(routeSearch, ['skip', 'limit']);

  const methods = useForm({
    defaultValues,
  });

  const submitFilter = (data: FilmsListFilters) => {
    const filledOptions = filterValues(data);
    const { searchLastVisitedFilms, ...search } = filledOptions;

    if (searchLastVisitedFilms) {
      const ids = LocalStorage.getItem<number[]>('LAST_VISITED_FILMS');

      if (ids) {
        search.ids = ids;
      }
    }

    navigate({
      search,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (filtersCount > 0) {
      methods.reset(routeSearch);
      updateFiltersCount(filtersCount);
    } else {
      methods.reset(defaultValues);
      updateFiltersCount(0);
    }
  }, [routeSearch, filtersCount]);

  const handleReset = () => {
    navigate({
      to: '/',
    });
    methods.reset(defaultValues);
    window.scrollTo(0, 0);
    updateFiltersCount(0);
    setIsFilterOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFilter)}
        className={styles.filters}
      >
        <ScrollableWrapper className={styles.filterGroups}>
          {config.map((filter) => (
            <FilterOptions filter={filter} key={filter.title} />
          ))}
        </ScrollableWrapper>
        <div className={styles.controls}>
          <Button icon={<SearchIcon />} type="submit">
            Search
          </Button>
          {filtersCount > 0 && (
            <Button
              onClick={handleReset}
              icon={<RefreshCcwIcon />}
              variant="secondary"
            >
              Reset
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
