import classNames from 'classnames';
import styles from './styles.module.css';
import type { PropsWithChildren } from 'react';
import type { PropsWithClassName } from '~/common';

type Props = PropsWithChildren<PropsWithClassName>;

export const ModalContent = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.content, className)} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
