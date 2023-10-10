import classes from './Sidebar.module.css';
import classNames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { Filters } from '@/pages/Main/components';

const Sidebar = () => {
  const { isFilterOpen } = useAppContext();

  return (
    <aside
      className={classNames(classes.sidebar, {
        [classes.open]: isFilterOpen,
      })}
    >
      <Filters />
    </aside>
  );
};

export { Sidebar };
