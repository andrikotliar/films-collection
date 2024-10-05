import { ComponentProps, FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent } from './components';

import styles from './Modal.module.css';
import classNames from 'classnames';

type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  modalWrapperClassName?: string;
} & ComponentProps<typeof ModalContent>;

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen = false,
  children,
  onClose,
  modalWrapperClassName,
  ...props
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={classNames(styles.modal, modalWrapperClassName)}
      onClick={onClose}
    >
      <ModalContent {...props} onClose={onClose}>
        {children}
      </ModalContent>
    </div>,
    document.body,
  );
};

export { Modal, type ModalProps };
