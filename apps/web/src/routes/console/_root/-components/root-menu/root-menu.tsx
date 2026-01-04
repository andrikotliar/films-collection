import styles from './root-menu.module.css';
import { Link } from '@tanstack/react-router';
import { consoleMenuConfig, defineCssProperties, Panel } from '~/shared';

export const RootMenu = () => {
  return (
    <Panel>
      <div className={styles.root_menu}>
        {consoleMenuConfig.map((item) => (
          <Link
            key={item.id}
            to={item.route}
            className={styles.root_menu_item}
            style={defineCssProperties({
              '--console-link-color': `var(--${item.color})`,
            })}
          >
            <div className={styles.root_menu_icon}>{item.icon}</div>
            {item.title}
          </Link>
        ))}
      </div>
    </Panel>
  );
};
