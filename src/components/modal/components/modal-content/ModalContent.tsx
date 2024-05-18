import classNames from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';

import styles from './ModalContent.module.css';
import { Icons } from '@/components/icons/Icons';

type ModalContentProps = {
  contentClassName?: string;
  onClose: VoidFunction;
};

const ModalContent: FC<PropsWithChildren<ModalContentProps>> = ({
  children,
  contentClassName,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={classNames(styles.content, contentClassName)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <button onClick={onClose} className={styles.closeButton}>
        <Icons icon="close" size={15} />
      </button>
    </div>
  );
};

export { ModalContent, type ModalContentProps };
