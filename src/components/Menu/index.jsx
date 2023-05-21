import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './styles.css';
import { CollectionsIcon } from '@/assets/icons';

const menuLinks = [
  {
    title: 'Home',
    type: 'link',
    link: '/',
  },
  {
    title: 'Collections',
    type: 'button',
    action: 'SHOW_COLLECTIONS',
    icon: <CollectionsIcon />
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
          <Link to={item.link} className="menu__action" key={item.title}>
            <div className="menu__action-icon">
              {item.icon}
            </div>
            {item.title}
          </Link>
        ) : (
          <button
            className="menu__action"
            onClick={() => menuAction(item.action)}
            key={item.title}
          >
            <div className="menu__action-icon">
              {item.icon}
            </div>
            {item.title}
          </button>
        )
      )}
    </div>
  );
};

export default Menu;