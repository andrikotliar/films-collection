import FilterCheckbox from "../FilterCheckbox";
import FiltersGroupHeader from "../FiltersGroupHeader";
import './styles.css';

const StandardFilter = ({ filter }) => {
  return (
    <div className="filters-group">
      <FiltersGroupHeader title={filter.title} />
      <div className="standard-filter">
        {filter.options.map((option, index) => (
          <FilterCheckbox
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