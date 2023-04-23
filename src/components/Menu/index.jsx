import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './styles.css';

const Menu = ({ isOpen }) => {
  return (
    <div className={classNames('menu', {
      'menu--active': isOpen
    })}>
      <Link to="/" className="menu__link">
        Home
      </Link>
      <Link to="/info" className="menu__link">
        Collections
      </Link>
      <Link to="/?collections=Top 10" className="menu__link">
        Top 10
      </Link>
      <Link to="/stats" className="menu__link">
        Stats
      </Link>
    </div>
  );
};

export default Menu;