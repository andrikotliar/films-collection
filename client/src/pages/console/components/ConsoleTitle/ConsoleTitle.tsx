import styles from './ConsoleTitle.module.css';
import { PropsWithClassName } from '@/types';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

type ConsoleTitleProps = PropsWithChildren<PropsWithClassName>;

export const ConsoleTitle: FC<ConsoleTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h1 className={classNames(styles.consolePageTitle, className)}>
      {children}
    </h1>
  );
};
