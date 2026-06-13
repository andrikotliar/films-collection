import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalCloseButton, ModalContent } from '~/shared/components/modal/components';
import clsx from 'clsx';
import { BLOCKING_SCROLL_CLASS_NAME } from '~/shared/constants';

type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  isAllowedClickOutside?: boolean;
  children: React.ReactNode;
};

export const Modal = ({
  isOpen = false,
  children,
  onClose,
  isAllowedClickOutside = true,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={clsx(styles.modal, BLOCKING_SCROLL_CLASS_NAME)}
      onClick={isAllowedClickOutside ? onClose : undefined}
      aria-label="Close modal window"
    >
      {children}
    </div>,
    document.body,
  );
};

Modal.Content = ModalContent;
Modal.CloseButton = ModalCloseButton;
