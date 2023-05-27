import './styles.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  CollectionsIcon,
  GridIcon,
  InfoIcon,
  RankIcon,
  StatsIcon
} from '@/assets/icons';
import MenuWrapper from '../MenuWrappper';

const menuLinks = [
  {
    title: 'Films',
    type: 'link',
    link: '/',
    icon: <GridIcon />
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
    link: '/?collections=Top 10',
    icon: <RankIcon />
  },
  {
    title: 'Statistic',
    type: 'link',
    link: '/stats',
    icon: <StatsIcon />
  },
  {
    title: 'Info',
    type: 'link',
    link: '/info',
    icon: <InfoIcon />
  }
]

const HeaderMenu = ({ isOpen }) => {
  const menuAction = (action) => {
    switch(action) {
      case 'SHOW_COLLECTIONS':
        return console.log('Show collections');
      default:
        return console.log('No action defined');
    }
  }

  return (
    <MenuWrapper isOpen={isOpen}>
      <div className="header-menu">
        {menuLinks.map((item) =>
          item.type === 'link' ? (
            <Link to={item.link} className="header-menu__action" key={item.title}>
              <div className="header-menu__action-icon">
                {item.icon}
              </div>
              {item.title}
            </Link>
          ) : (
            <button
              className="header-menu__action"
              onClick={() => menuAction(item.action)}
              key={item.title}
            >
              <div className="header-menu__action-icon">
                {item.icon}
              </div>
              {item.title}
            </button>
          )
        )}
      </div>
    </MenuWrapper>
  );
};

export default HeaderMenu;