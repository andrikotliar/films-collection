import './filters.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { filtersConfig } from '@/configs';
import { useFilmsContext } from '@/context/FilmsContext';
import { useForm, FormProvider, useFormState } from 'react-hook-form';
import { FilterIcon, ResetIcon } from '@/assets/icons';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components';
import { ExpandFilter, StandardFilter } from './components';
import { isResetBtnVisible } from './helpers';

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } = useFilmsContext();
  const { setIsFilterOpen } = useAppContext();
  const location = useLocation();

  const methods = useForm();
  const { dirtyFields } = useFormState({
    control: methods.control,
  })

  const submitFilter = (data: any) => {
    setIsFilterOpen(false);
    updateFilter(data, dirtyFields);
  };

  useEffect(() => {
    if(filterParams) {
      methods.reset(filterParams);
    }
  }, [filterParams])

  useEffect(() => {
    if(location.search.includes('?search')) {
      methods.reset();
    }
  }, [location]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitFilter)} className="filters">
        <div className="filters__container custom-scroll">
          {filtersConfig.map(filter => 
            filter.type === 'standard' ? (
              <StandardFilter
                filter={filter}
                key={filter.title}
              />
            ) : (
              <ExpandFilter
                filter={filter}
                key={filter.title}
              />
            )
          )}
        </div>
        <div className="filters__controls">
          <Button icon={<FilterIcon color="white" />} type="submit" className="filters__apply">
            Apply
          </Button>
          {isResetBtnVisible(filterParams) && (
            <Button
              onClick={() => {
                resetFilter();
                methods.reset();
              }}
              icon={<ResetIcon />}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Filters;