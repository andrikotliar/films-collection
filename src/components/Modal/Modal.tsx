import { Button } from '@/components/Button';
import classes from './Modal.module.css';
import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/assets/icons';
import classNames from 'classnames';

type ModalProps = {
  isOpen: boolean;
  close: VoidFunction;
  contentClassName?: string;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen = false,
  children,
  close,
  contentClassName,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={classes.modal} onClick={close}>
      <div
        className={classNames(classes.content, contentClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button
          design="ghost"
          onClick={close}
          icon={<CloseIcon color="black" />}
          className={classes.closeButton}
        />
      </div>
    </div>,
    document.body,
  );
};

export { Modal };
