import classes from './Sidebar.module.css';
import classNames from 'classnames';
import { useSidebarContext } from '@/pages/Main/components/Sidebar/Sidebar.context';
import { Filters } from '@/pages/Main/components';
import { Button } from '@/components';
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
      <Button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        icon={<SlidersHorizontal />}
        className={classes.filterButton}
        isHidden
      >
        {filtersCount > 0 && (
          <span className={classes.filterButtonBadge}>{filtersCount}</span>
        )}
      </Button>
    </>
  );
};

export { Sidebar };
