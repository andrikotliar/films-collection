import classes from './Modal.module.css';
import { ComponentProps, FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent } from '@/components/Modal/ModalContent';

type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
} & ComponentProps<typeof ModalContent>;

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen = false,
  children,
  onClose,
  ...props
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={classes.modal} onClick={onClose}>
      <ModalContent {...props} onClose={onClose}>
        {children}
      </ModalContent>
    </div>,
    document.body,
  );
};

export { Modal };
