import './menu.css';
import { FC } from 'react';
import { Link, useLocation } from "react-router-dom";
import classNames from 'classnames';
import { AdminIcon, InfoIcon, StatsIcon } from "@/assets/icons";

type MenuProps = {
  isActive: boolean;
}

const menu = [
  {
    title: 'Statistic',
    route: '/stats',
    icon: <StatsIcon />,
    visible: false
  },
  {
    title: 'Information',
    route: '/info',
    icon: <InfoIcon />,
    visible: true
  },
  {
    title: 'Admin',
    route: '/admin',
    icon: <AdminIcon />,
    visible: false
  },
];

const Menu: FC<MenuProps> = ({ isActive }) => {
  const { pathname } = useLocation();

  return (
    <div className={classNames('menu', {
      'menu--open': isActive
    })}>
      {menu.map((item) => item.visible && (
        <Link
          className={classNames('menu__link', {
            'menu__link--active': pathname === item.route
          })}
          to={item.route}
          key={item.route}
        >
          <div className="menu__link-icon">
            {item.icon}
          </div>
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Menu;