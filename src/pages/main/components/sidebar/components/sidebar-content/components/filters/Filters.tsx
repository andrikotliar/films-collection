import styles from './Filters.module.css';
import { useEffect, useState } from 'react';
import { filtersConfig } from '@/configs';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Icons, Tabs } from '@/components';
import { useSidebarContext } from '@/pages/main/components/sidebar/context';
import { FilterOptions } from './components';
import { countObjectKeys, filterValues } from '@/helpers';
import { useQueryFilter } from '@/hooks';

const defaultValues = {
  type: null,
  collections: null,
  genres: null,
  year: null,
  country: null,
  studio: null,
};

const COLLECTIONS_TAB_INDEX = 1;

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } = useQueryFilter();
  const [defaultTabIndex, setDefaultTabIndex] = useState(0);

  const filtersCount = countObjectKeys(filterParams, ['pageIndex']);

  const { setIsFilterOpen, updateFiltersCount } = useSidebarContext();

  const methods = useForm({
    defaultValues,
  });

  const submitFilter = (data: any) => {
    const filledOptions = filterValues(data);

    if (filledOptions.collections === 'Any') {
      delete filledOptions.collections;
    }

    updateFilter({
      ...filledOptions,
      pageIndex: 0,
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

    if (filterParams.collections) {
      setDefaultTabIndex(COLLECTIONS_TAB_INDEX);
    }
  }, [filterParams, filtersCount]);

  const handleReset = () => {
    resetFilter();
    methods.reset(defaultValues);
    window.scrollTo(0, 0);
    updateFiltersCount(0);
    setDefaultTabIndex(0);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFilter)}
        className={styles.filters}
      >
        <h2 className={styles.mobileHeader}>
          <span>Filters</span>
          <button onClick={() => setIsFilterOpen(false)}>
            <Icons icon="close" />
          </button>
        </h2>
        <Tabs
          defaultTabIndex={defaultTabIndex}
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
          <Button icon={<Icons icon="search" />} type="submit">
            Search
          </Button>
          {filtersCount > 0 && (
            <Button
              onClick={handleReset}
              icon={<Icons icon="reset" />}
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
