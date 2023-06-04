import { useAppContext } from '@/context/AppContext';
import Filters from '../Filters';
import './styles.css';
import classNames from 'classnames';

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

export default Sidebar;
