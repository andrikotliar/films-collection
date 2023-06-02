import './styles.css';
import { FC } from 'react';
import { Filter } from '@/types';
import FilterCheckbox from "../FilterCheckbox";
import FiltersGroupHeader from "../FiltersGroupHeader";

type StandardFilterProps = {
  filter: Filter
};

const StandardFilter: FC<StandardFilterProps> = ({ filter }) => {
  return (
    <div className="filters-group">
      <FiltersGroupHeader title={filter.title} />
      <div className="standard-filter">
        {filter.options.map((option, index) => (
          <FilterCheckbox
            type={filter.radio ? 'radio' : 'checkbox'}
            option={option}
            property={filter.property}
            key={index}
          />
        ))}
      </div>
    </div> 
  );
};

export default StandardFilter;