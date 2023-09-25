import './sidebar.css';
import classNames from 'classnames';
import { useAppContext } from '@/context/AppContext';
import { Filters } from '@/pages/Main/components';

const Sidebar = () => {
  const { isFilterOpen } = useAppContext();

  return (
    <aside className={classNames('sidebar', {
      'sidebar--open': isFilterOpen
    })}>
      <Filters />
    </aside>
  );
};

export { Sidebar };
