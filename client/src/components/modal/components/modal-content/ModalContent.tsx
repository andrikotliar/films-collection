import classNames from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';

import styles from './ModalContent.module.css';
import { XIcon } from 'lucide-react';

type ModalContentProps = {
  contentClassName?: string;
  closeButtonClassName?: string;
  onClose: VoidFunction;
};

const ModalContent: FC<PropsWithChildren<ModalContentProps>> = ({
  children,
  contentClassName,
  closeButtonClassName,
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
      <button
        onClick={onClose}
        className={classNames(styles.closeButton, closeButtonClassName)}
      >
        <XIcon size={15} />
      </button>
    </div>
  );
};

export { ModalContent, type ModalContentProps };
