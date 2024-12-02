import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './RouterLink.module.css';

type RouterLinkProps = ComponentProps<typeof Link>;

const RouterLink: FC<RouterLinkProps> = ({ children, className, ...props }) => {
  return (
    <Link className={classNames(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};

export { RouterLink };
