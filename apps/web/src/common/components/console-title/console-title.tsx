import styles from './styles.module.css';
import clsx from 'clsx';
import { type ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
};

export const ConsoleTitle = ({ children, className }: Props) => {
  return <h1 className={clsx(styles.console_page_title, className)}>{children}</h1>;
};
