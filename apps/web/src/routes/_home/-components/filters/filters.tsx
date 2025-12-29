import styles from './filters.module.css';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FilterOptions } from './components';
import {
  countObjectKeys,
  filterValues,
  type FilterItem,
  Button,
  type ExtractParams,
  type api,
} from '~/shared';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { getRouteApi } from '@tanstack/react-router';

type FiltersProps = {
  config: FilterItem[];
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  updateFiltersCount: (value: number) => void;
};

type FilmsListFilters = ExtractParams<typeof api.films.list>['queryParams'];

const defaultValues: FilmsListFilters = {
  type: undefined,
  style: undefined,
  collectionId: undefined,
  genreIds: undefined,
  startDate: undefined,
  endDate: undefined,
  countryIds: undefined,
  studioIds: undefined,
};

const routeApi = getRouteApi('/_home/');

export const Filters = ({ config, setIsFilterOpen, updateFiltersCount }: FiltersProps) => {
  const navigate = routeApi.useNavigate();
  const routeSearch = routeApi.useSearch();

  const filtersCount = countObjectKeys(routeSearch, ['skip', 'limit']);

  const filtersForm = useForm({
    defaultValues,
  });

  const submitFilter = (data: FilmsListFilters) => {
    const filledOptions = filterValues(data);

    navigate({
      search: filledOptions,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (filtersCount > 0) {
      filtersForm.reset(routeSearch);
      updateFiltersCount(filtersCount);
    } else {
      filtersForm.reset(defaultValues);
      updateFiltersCount(0);
    }
  }, [routeSearch, filtersCount]);

  const handleReset = () => {
    navigate({
      to: '/',
    });
    filtersForm.reset(defaultValues);
    window.scrollTo(0, 0);
    updateFiltersCount(0);
    setIsFilterOpen(false);
  };

  return (
    <FormProvider {...filtersForm}>
      <form onSubmit={filtersForm.handleSubmit(submitFilter)} className={styles.filters}>
        <div className={styles.filter_groups}>
          {config.map((filter) => (
            <FilterOptions filter={filter} key={filter.title} />
          ))}
        </div>
        <div className={styles.controls}>
          <Button icon={<SearchIcon />} type="submit">
            Search
          </Button>
          {filtersCount > 0 && (
            <Button onClick={handleReset} icon={<RefreshCcwIcon />} variant="secondary">
              Reset
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
