import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './ConsoleContentLayout.module.css';

type ConsoleContentLayoutProps = PropsWithChildren<{
  className?: string;
}>;

export const ConsoleContentLayout: FC<ConsoleContentLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.consoleContentLayout, className)}>
      {children}
    </div>
  );
};
