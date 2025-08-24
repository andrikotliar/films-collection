import styles from './console-title.module.css';
import classNames from 'classnames';
import { type ReactNode } from 'react';

type ConsoleTitleProps = {
  className?: string;
  children?: ReactNode;
};

export const ConsoleTitle = ({ children, className }: ConsoleTitleProps) => {
  return <h1 className={classNames(styles.consolePageTitle, className)}>{children}</h1>;
};
