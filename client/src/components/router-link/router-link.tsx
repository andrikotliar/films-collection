import classNames from 'classnames';
import { Link, LinkProps } from '@tanstack/react-router';
import styles from './router-link.module.css';

type RouterLinkProps = LinkProps & {
  className?: string;
};

export const RouterLink = ({
  children,
  className,
  ...props
}: RouterLinkProps) => {
  return (
    <Link className={classNames(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};
