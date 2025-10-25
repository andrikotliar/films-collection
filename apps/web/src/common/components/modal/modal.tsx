import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import classNames from 'classnames';
import { ModalContent, ModalCloseButton } from './components';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  className?: string;
  children?: ReactNode;
  isAllowedClickOutside?: boolean;
};

export const Modal = ({
  isOpen = false,
  children,
  className,
  onClose,
  isAllowedClickOutside = true,
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={classNames(styles.modal, className)}
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
