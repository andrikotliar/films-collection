import { type PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import clsx from 'clsx';
import type { PropsWithClassName } from '~/shared/types';
import { ModalCloseButton, ModalContent } from '~/shared/components/modal/components';

type Props = PropsWithClassName<{
  isOpen: boolean;
  onClose: VoidFunction;
  isAllowedClickOutside?: boolean;
}>;

export const Modal = ({
  isOpen = false,
  children,
  className,
  onClose,
  isAllowedClickOutside = true,
}: PropsWithChildren<Props>) => {
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
      className={clsx(styles.modal, className)}
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
