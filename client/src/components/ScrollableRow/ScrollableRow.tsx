import { FC, PropsWithChildren } from 'react';
import { PropsWithClassName } from '@/types';
import classNames from 'classnames';
import { ScrollableWrapper } from '../ScrollableWrapper/ScrollableWrapper';
import styles from './ScrollableRow.module.css';

type ScrollableRowProps = PropsWithChildren<PropsWithClassName>;

const ScrollableRow: FC<ScrollableRowProps> = ({ children, className }) => {
  return (
    <ScrollableWrapper className={classNames(styles.scrollableRow, className)}>
      {children}
    </ScrollableWrapper>
  );
};

export { ScrollableRow };
