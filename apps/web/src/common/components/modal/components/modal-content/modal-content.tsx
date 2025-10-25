import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './styles.module.css';

type ModalContentProps = {
  className?: string;
  children?: ReactNode;
};

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={classNames(styles.content, className)} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
