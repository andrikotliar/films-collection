import { useEffect } from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FilterCheckbox from '../FilterCheckbox';
import FiltersGroupHeader from '../FiltersGroupHeader';
import { ExpandIcon } from '@/assets/icons';
import './styles.css';

const ExpandFilter = ({ filter }) => {
  const [ title, setTitle ] = useState(filter.defaultOptionTitle);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const { watch } = useFormContext();

  const currentValue = watch(filter.property);

  useEffect(() => {
    if(currentValue) {
      setTitle(currentValue);
    } else {
      setTitle(filter.defaultOptionTitle);
    }
  }, [currentValue]);

  return (
    <div className="filters-group">
      <FiltersGroupHeader title={filter.title} />
      <div className="expand-filter">
        <div className="expand-filter__header">
          <button
            className="expand-filter__button"
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
          >
            <span>{title}</span>
            <ExpandIcon className={`is-expanded-${isExpanded}`} color="#000" />
          </button>
        </div>
        {isExpanded && (
          <div className="expand-filter__list custom-scroll">
            {filter.options.map(option => (
              <FilterCheckbox
                type="radio"
                option={option}
                property={filter.property}
                key={option}
              />
            ))}
          </div>
        )}
      </div>
    </div>  
  );
};

export default ExpandFilter;
