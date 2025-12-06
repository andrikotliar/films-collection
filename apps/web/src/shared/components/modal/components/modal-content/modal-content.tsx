import clsx from 'clsx';
import styles from './modal-content.module.css';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '~/shared';

type ModalContentProps = PropsWithChildren<PropsWithClassName>;

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={clsx(styles.content, className)} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
