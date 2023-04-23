import { useFilmsContext } from "@/context/filmsContext";
import './styles.css';

const SelectedFilters = () => {
  const { filterParams } = useFilmsContext();

  if(!Object.keys(filterParams).length) {
    return null;
  }

  return (
    <div className="selected-filters-list">
      {Object.entries(filterParams).map((entry) => (
        <div key={entry[0]} className="selected-filter">
          <span>{entry[0]}:</span>
          {Array.isArray(entry[1]) && entry[1]?.length > 1 ? (
            <span>{entry[1].join(', ')}</span>
          ): (
            <span>{entry[1]}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectedFilters;