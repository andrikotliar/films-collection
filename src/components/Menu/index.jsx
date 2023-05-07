import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './styles.css';

const menuLinks = [
  {
    title: 'Home',
    type: 'link',
    link: '/',
  },
  {
    title: 'Collections',
    type: 'button',
    action: 'SHOW_COLLECTIONS'
  },
  {
    title: 'Top 10',
    type: 'link',
    link: '/?collections=Top 10'
  },
  {
    title: 'Statistic',
    type: 'link',
    link: '/stats' 
  }
]

const Menu = ({ isOpen }) => {
  const menuAction = (action) => {
    switch(action) {
      case 'SHOW_COLLECTIONS':
        return console.log('Show collections');
      default:
        return console.log('No action defined');
    }
  }

  return (
    <div className={classNames('menu', {
      'menu--active': isOpen
    })}>
      {menuLinks.map((item) => 
        item.type === 'link' ? (
          <Link to={item.link} className="menu__link" key={item.title}>
            {item.title}
          </Link>
        ) : (
          <button onClick={() => menuAction(item.action)} key={item.title}>
            {item.title}
          </button>
        )
      )}
    </div>
  );
};

export default Menu;