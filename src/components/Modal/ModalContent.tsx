import { Button } from '@/components';
import classNames from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';
import classes from './ModalContent.module.css';
import { X } from 'lucide-react';

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
      className={classNames(classes.content, contentClassName)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <Button
        variant="ghost"
        onClick={onClose}
        icon={<X />}
        className={classes.closeButton}
      />
    </div>
  );
};

export { ModalContent };
