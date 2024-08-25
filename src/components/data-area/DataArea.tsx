import { FC, PropsWithChildren } from 'react';
import { PropsWithClassName } from '@/common/types';
import styles from './DataArea.module.css';
import classNames from 'classnames';

type DataAreaProps = PropsWithChildren<PropsWithClassName>;

const DataArea: FC<DataAreaProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.content, className)}>{children}</div>
  );
};

export { DataArea };
