import styles from './icon-link.module.css';
import { Link, type LinkProps } from '@tanstack/react-router';

type IconLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  icon: React.ReactNode;
};

export const IconLink = ({ icon, ...props }: IconLinkProps) => {
  return (
    <Link className={styles.icon_link} {...props}>
      {icon}
    </Link>
  );
};
