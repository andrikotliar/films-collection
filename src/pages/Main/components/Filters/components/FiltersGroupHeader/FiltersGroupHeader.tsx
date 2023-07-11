import './filters-group-header.css';
import { FC } from 'react';

const FiltersGroupHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="filters-group__header">
      <div className="filters-group__title">
        {title}
      </div>
    </div>
  );
};

export default FiltersGroupHeader;