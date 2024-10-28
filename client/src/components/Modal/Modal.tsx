import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { ModalContent, ModalCloseButton } from './components';

type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  className?: string;
  children?: ReactNode;
};

const Modal = ({
  isOpen = false,
  children,
  className,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={classNames(styles.modal, className)}
      onClick={onClose}
      aria-label="Close modal window"
    >
      {children}
    </div>,
    document.body,
  );
};

Modal.Content = ModalContent;
Modal.CloseButton = ModalCloseButton;

export { Modal };
