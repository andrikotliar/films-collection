import classes from './SelectedFilters.module.css';
import { useFilmsContext } from '@/context/FilmsContext';
import { DynamicObject } from '@/common';

const SelectedFilters = () => {
  const { filterParams } = useFilmsContext();

  const filterKeys = Object.keys(filterParams);

  if (filterKeys.length === 0) return null;

  const getValue = (filterParams: DynamicObject, param: string) => {
    if (param === 'crew') {
      const parsedData = JSON.parse(filterParams[param]);
      return Object.values(parsedData).join(', ');
    }

    if (param === 'actor') {
      const parsedData = JSON.parse(filterParams[param]);
      return parsedData.name;
    }

    if (Array.isArray(filterParams[param])) {
      return filterParams[param].join(', ');
    }

    return filterParams[param];
  };

  const getTitle = (param: string) => {
    switch (param) {
      case 'actor':
        return 'Starred';
      case 'crew':
        const parsedData = JSON.parse(filterParams[param]);
        const keys = Object.keys(parsedData);
        return keys[0];
      case 'search':
        return 'Search string';
      default:
        return param[0].toUpperCase() + param.slice(1);
    }
  };

  return (
    <div className={classes.selectedFilters}>
      {filterKeys.map((param) => (
        <div className={classes.filter} key={param}>
          <b>{getTitle(param)}:</b>
          <span>{getValue(filterParams, param)}</span>
        </div>
      ))}
    </div>
  );
};

export { SelectedFilters };
