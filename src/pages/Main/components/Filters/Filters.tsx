import classes from './Filters.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { isResetBtnVisible } from './helpers';
import { filterValues } from '@/helpers';

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } =
    useFilmsContext();
  const { setIsFilterOpen } = useAppContext();
  const location = useLocation();

  const methods = useForm();

  const submitFilter = (data: any) => {
    const filledOptions = filterValues(data);

    updateFilter(filledOptions);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (filterParams) {
      methods.reset(filterParams);
    }
  }, [filterParams]);

  useEffect(() => {
    if (location.search.includes('?search')) {
      methods.reset();
    }
  }, [location]);

  const handleReset = () => {
    resetFilter();
    methods.reset();
  };

  const isResetAvailable = isResetBtnVisible(filterParams);

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
          {isResetAvailable && (
            <Button
              onClick={handleReset}
              icon={<ResetIcon />}
              isHidden={isResetAvailable}
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
