import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './modal-content.module.css';

type ModalContentProps = {
  className?: string;
};

export const ModalContent: FC<PropsWithChildren<ModalContentProps>> = ({
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
