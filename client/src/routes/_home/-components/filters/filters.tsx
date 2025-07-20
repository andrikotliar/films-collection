import styles from './filters.module.css';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, ScrollableWrapper } from '@/components';
import { FilterOptions } from './components';
import { countObjectKeys, filterValues } from '@/common';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { FilmsListFilters, FilterItem } from '@/common';
import { getRouteApi } from '@tanstack/react-router';

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
};

const routeApi = getRouteApi('/_home/');

export const Filters = ({
  config,
  setIsFilterOpen,
  updateFiltersCount,
}: FiltersProps) => {
  const navigate = routeApi.useNavigate();
  const routeSearch = routeApi.useSearch();

  const filtersCount = countObjectKeys(routeSearch, ['skip', 'limit']);

  const methods = useForm({
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
