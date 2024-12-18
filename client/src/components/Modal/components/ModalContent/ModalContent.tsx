import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './ModalContent.module.css';
import { PropsWithClassName } from '@/types';

export const ModalContent: FC<PropsWithChildren<PropsWithClassName>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(styles.content, className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
