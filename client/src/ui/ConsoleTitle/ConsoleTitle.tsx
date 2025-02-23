import styles from './ConsoleTitle.module.css';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

type ConsoleTitleProps = PropsWithChildren<{
  className?: string;
}>;

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
