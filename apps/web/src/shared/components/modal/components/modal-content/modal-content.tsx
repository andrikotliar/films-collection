import clsx from 'clsx';
import styles from './styles.module.css';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '~/shared';

type Props = PropsWithChildren<PropsWithClassName>;

export const ModalContent = ({ children, className }: Props) => {
  return (
    <div className={clsx(styles.content, className)} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
