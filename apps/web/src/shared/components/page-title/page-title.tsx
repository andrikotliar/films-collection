import styles from './page-title.module.css';
import clsx from 'clsx';

type PageTitleProps = {
  className?: string;
  children: React.ReactNode;
};

export const PageTitle = ({ children, className }: PageTitleProps) => {
  return <h1 className={clsx(styles.page_title, className)}>{children}</h1>;
};
