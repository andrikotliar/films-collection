import classes from './Sidebar.module.css';
import classNames from 'classnames';
import { useSidebarContext } from '@/pages/Main/components/Sidebar/Sidebar.context';
import { Filters } from '@/pages/Main/components';
import { SlidersHorizontal } from 'lucide-react';

const Sidebar = () => {
  const { isFilterOpen, setIsFilterOpen, filtersCount } = useSidebarContext();

  return (
    <>
      <aside
        className={classNames(classes.sidebar, {
          [classes.open]: isFilterOpen,
        })}
      >
        <Filters />
      </aside>
      <div className={classNames(classes.actionsWrapper)}>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={classes.filterButton}
        >
          <SlidersHorizontal />
          <span>Filters</span>
          {filtersCount > 0 && (
            <span className={classes.filterButtonBadge}>{filtersCount}</span>
          )}
        </button>
      </div>
    </>
  );
};

export { Sidebar };
