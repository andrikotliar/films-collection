import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styles from './TagLink.module.css';
import classNames from 'classnames';

type TagLinkProps = {
  path: string;
  variant?: 'blue' | 'sand' | 'gray';
};

const TagLink: FC<PropsWithChildren<TagLinkProps>> = ({
  path,
  children,
  variant = 'sand',
}) => {
  return (
    <Link to={path} className={classNames(styles.link, styles[variant])}>
      {children}
    </Link>
  );
};

export { TagLink, type TagLinkProps };
