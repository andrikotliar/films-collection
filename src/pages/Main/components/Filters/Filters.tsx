import classes from './Filters.module.css';
import { useEffect } from 'react';
import { filtersConfig } from '@/configs';
import { useFilmsContext } from '@/context/FilmsContext';
import { useForm, FormProvider } from 'react-hook-form';
import {
  CloseIcon,
  FilterIcon,
  ResetIcon,
} from '@/assets/icons';
import { useAppContext } from '@/context/AppContext';
import { Button, Scrollable } from '@/components';
import { FilterOptions } from './components';
import { hasFiltersLength } from './helpers';
import { filterValues } from '@/helpers';

const defaultValues = filtersConfig.reduce(
  (values, { property }) => {
    return {
      ...values,
      [property]: null,
    };
  },
  {},
);

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } =
    useFilmsContext();

  const hasFilters = hasFiltersLength(filterParams);

  const { setIsFilterOpen } = useAppContext();

  const methods = useForm({
    defaultValues,
  });

  const submitFilter = (data: any) => {
    const filledOptions = filterValues(data);

    updateFilter(filledOptions);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (hasFilters) {
      methods.reset(filterParams);
    }
  }, [filterParams, hasFilters]);

  const handleReset = () => {
    resetFilter();
    methods.reset(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFilter)}
        className={classes.filters}
      >
        <h2 className={classes.mobileHeader}>Filters</h2>
        <Scrollable className={classes.wrapper}>
          {filtersConfig.map(filter => (
            <FilterOptions
              filter={filter}
              key={filter.title}
            />
          ))}
        </Scrollable>
        <div className={classes.controls}>
          <Button
            icon={<FilterIcon color="white" />}
            type="submit"
            className={classes.apply}
          >
            Apply
          </Button>
          {hasFilters && (
            <Button
              onClick={handleReset}
              icon={<ResetIcon />}
            />
          )}
          <Button
            icon={<CloseIcon />}
            className={classes.closeButton}
            onClick={() => setIsFilterOpen(false)}
            isHidden
          />
        </div>
      </form>
    </FormProvider>
  );
};

export { Filters };
