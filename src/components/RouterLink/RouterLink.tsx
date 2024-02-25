import classNames from 'classnames';
import { ComponentProps, FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './RouterLink.module.css';

type Props = ComponentProps<typeof Link>;

const RouterLink: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Link className={classNames(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};

export { RouterLink };
