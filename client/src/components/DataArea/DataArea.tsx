import { FC, PropsWithChildren } from 'react';
import styles from './DataArea.module.css';
import classNames from 'classnames';

type DataAreaProps = PropsWithChildren<{
  className?: string;
}>;

export const DataArea: FC<DataAreaProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.content, className)}>{children}</div>
  );
};
