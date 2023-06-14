import './styles.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { filtersConfig } from '@/configs';
import StandardFilter from './components/StandardFilter';
import ExpandFilter from './components/ExpandFilter';
import { useFilmsContext } from '@/context/FilmsContext';
import { useForm, FormProvider, useFormState } from 'react-hook-form';
import { FilterIcon, ResetIcon } from '@/assets/icons';

const Filters = () => {
  const { filterParams, updateFilter, resetFilter } = useFilmsContext();
  const location = useLocation();

  const methods = useForm();
  const { dirtyFields } = useFormState({
    control: methods.control,
  })

  const submitFilter = (data: any) => {
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
          <button className="button filters__apply">
            <div className="button__icon">
              <FilterIcon color="white" />
            </div>
            <span>Apply</span>
          </button>
          {Object.keys(filterParams).length !== 0 && (
            <button type="button" className="button" onClick={() => {
              resetFilter();
              methods.reset();
            }}>
              <div className="button__icon">
                <ResetIcon />
              </div>
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Filters;
