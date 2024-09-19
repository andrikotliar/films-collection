import styles from './Filters.module.css';
import { useContext, useEffect } from 'react';
import { filtersConfig } from '@/configs';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Tabs } from '@/components';
import { SidebarContext } from '@/pages/root/context';
import { FilterOptions } from './components';
import { countObjectKeys, filterValues } from '@/helpers';
import { useQueryFilter } from '@/hooks';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { TitleType } from '@/enums';

type FormValues = {
  type: TitleType[] | null;
  collections: string[] | null;
  genres: string[] | null;
  startDate: string | null;
  endDate: string | null;
  countries: string[] | null;
  production: string[] | null;
  extra: string | null;
};

const defaultValues: FormValues = {
  type: null,
  collections: null,
  genres: null,
  startDate: null,
  endDate: null,
  countries: null,
  production: null,
  extra: null,
};

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } = useQueryFilter();

  const filtersCount = countObjectKeys(filterParams, ['pageIndex']);

  const { setIsFilterOpen, updateFiltersCount } = useContext(SidebarContext);

  const methods = useForm({
    defaultValues,
  });

  const submitFilter = (data: FormValues) => {
    const filledOptions = filterValues(data);

    if (filledOptions.collections === 'Any') {
      delete filledOptions.collections;
    }

    updateFilter({
      ...filledOptions,
      skip: 0,
    });
    setIsFilterOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (filtersCount > 0) {
      methods.reset(filterParams);
      updateFiltersCount(filtersCount);
    }
  }, [filterParams, filtersCount]);

  const handleReset = () => {
    resetFilter();
    methods.reset(defaultValues);
    window.scrollTo(0, 0);
    updateFiltersCount(0);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFilter)}
        className={styles.filters}
      >
        <Tabs
          defaultTabIndex={0}
          components={[
            {
              label: 'General',
              content: (
                <div className={styles.filterGroups}>
                  {filtersConfig.general.map((filter) => (
                    <FilterOptions filter={filter} key={filter.title} />
                  ))}
                </div>
              ),
            },
            {
              label: 'Collections',
              content: (
                <div className={styles.filterGroups}>
                  {filtersConfig.collections.map((filter) => (
                    <FilterOptions filter={filter} key={filter.title} />
                  ))}
                </div>
              ),
            },
          ]}
        />
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

export { Filters };
