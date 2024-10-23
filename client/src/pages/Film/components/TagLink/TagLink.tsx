import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styles from './TagLink.module.css';
import classNames from 'classnames';

type TagLinkProps = {
  path: string;
  variant?:
    | 'blue'
    | 'sand'
    | 'gray'
    | 'pink'
    | 'red'
    | 'mint'
    | 'purple'
    | 'green';
  isDisabled?: boolean;
};

const TagLink: FC<PropsWithChildren<TagLinkProps>> = ({
  path,
  children,
  variant = 'sand',
  isDisabled = false,
}) => {
  return (
    <Link
      to={path}
      className={classNames(styles.link, styles[variant], {
        [styles.disabled]: isDisabled,
      })}
    >
      {children}
    </Link>
  );
};

export { TagLink, type TagLinkProps };
