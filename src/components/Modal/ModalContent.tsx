import { Button } from '@/components';
import classNames from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';
import styles from './ModalContent.module.css';
import { X } from 'lucide-react';

type Props = {
  contentClassName?: string;
  onClose: VoidFunction;
};

const ModalContent: FC<PropsWithChildren<Props>> = ({
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
        <X />
      </button>
    </div>
  );
};

export { ModalContent };
