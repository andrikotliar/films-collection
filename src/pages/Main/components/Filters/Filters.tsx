import classes from './Filters.module.css';
import { useEffect } from 'react';
import { filtersConfig } from '@/configs';
import { useFilmsContext } from '@/context';
import { useForm, FormProvider } from 'react-hook-form';
import { useSidebarContext } from '@/pages/Main/components/Sidebar/Sidebar.context';
import { Button, Tabs } from '@/components';
import { FilterOptions } from './components';
import { countObjectKeys, filterValues } from '@/helpers';
import { RotateCcw, Search, X } from 'lucide-react';

const defaultValues = {
  type: null,
  collections: null,
  genres: null,
  year: null,
  country: null,
  studio: null,
};

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } = useFilmsContext();

  const filtersCount = countObjectKeys(filterParams, ['pageIndex']);

  const { setIsFilterOpen, updateFiltersCount } = useSidebarContext();

  const methods = useForm({
    defaultValues,
  });

  const submitFilter = (data: any) => {
    const filledOptions = filterValues(data);

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
        className={classes.filters}
      >
        <h2 className={classes.mobileHeader}>
          <span>Filters</span>
          <button onClick={() => setIsFilterOpen(false)}>
            <X />
          </button>
        </h2>
        <Tabs
          components={[
            {
              label: 'General',
              content: (
                <div className={classes.filterGroups}>
                  {filtersConfig.general.map((filter) => (
                    <FilterOptions filter={filter} key={filter.title} />
                  ))}
                </div>
              ),
            },
            {
              label: 'Collections',
              content: (
                <div className={classes.filterGroups}>
                  {filtersConfig.collections.map((filter) => (
                    <FilterOptions filter={filter} key={filter.title} />
                  ))}
                </div>
              ),
            },
          ]}
        />
        <div className={classes.controls}>
          <Button icon={<Search color="#fff" />} type="submit">
            Search
          </Button>
          {filtersCount > 0 && (
            <Button
              onClick={handleReset}
              icon={<RotateCcw />}
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
