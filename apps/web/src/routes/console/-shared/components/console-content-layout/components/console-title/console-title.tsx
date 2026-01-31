import styles from './console-title.module.css';
import clsx from 'clsx';

type ConsoleTitleProps = {
  className?: string;
  children: React.ReactNode;
};

export const ConsoleTitle = ({ children, className }: ConsoleTitleProps) => {
  return <h1 className={clsx(styles.console_page_title, className)}>{children}</h1>;
};
