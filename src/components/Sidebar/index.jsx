import { CloseIcon } from '@/assets/icons';
import Filters from '../Filters';
import './styles.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__controls">
        <button className="sidebar__hide-button">
          <CloseIcon />
        </button>
      </div>
      <Filters />
    </aside>
  );
};

export default Sidebar;
