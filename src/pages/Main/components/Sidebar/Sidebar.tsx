import classes from './Sidebar.module.css';
import classNames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { Filters } from '@/pages/Main/components';
import { MouseEvent } from 'react';

const Sidebar = () => {
  const { isFilterOpen, setIsFilterOpen } = useAppContext();

  const handleCloseOnBg = (e: MouseEvent<HTMLElement>) => {
    if (isFilterOpen) {
      const target = e.target as Element;
      if (target.classList.contains(classes.sidebar)) {
        setIsFilterOpen(false);
      }
    }
  };

  return (
    <aside
      className={classNames(classes.sidebar, {
        [classes.open]: isFilterOpen,
      })}
      onClick={handleCloseOnBg}
    >
      <Filters />
    </aside>
  );
};

export { Sidebar };
