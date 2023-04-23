import './styles.css';

const FiltersGroupHeader = ({ title }) => {
  return (
    <div className="filters-group__header">
      <div className="filters-group__title">
        {title}
      </div>
    </div>
  );
};

export default FiltersGroupHeader;