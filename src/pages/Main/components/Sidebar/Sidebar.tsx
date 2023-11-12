import classes from './Sidebar.module.css';
import classNames from 'classnames';
import { useSidebarContext } from '@/pages/Main/components/Sidebar/Sidebar.context';
import { Filters } from '@/pages/Main/components';
import { Button } from '@/components';
import { FilterIcon } from '@/assets/icons';

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
        icon={<FilterIcon />}
        className={classes.filterButton}
        isHidden
      >
        Filters
        {filtersCount > 0 && <span>({filtersCount})</span>}
      </Button>
    </>
  );
};

export { Sidebar };
