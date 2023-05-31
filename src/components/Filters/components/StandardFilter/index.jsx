import './styles.css';
import classNames from "classnames";
import FilterCheckbox from "../FilterCheckbox";
import FiltersGroupHeader from "../FiltersGroupHeader";

const StandardFilter = ({ filter }) => {
  return (
    <div className="filters-group">
      <FiltersGroupHeader title={filter.title} />
      <div className={classNames('standard-filter', {
        'standard-filter-scrollable custom-scroll custom-scroll-visible': filter.isScrollable
      })}>
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