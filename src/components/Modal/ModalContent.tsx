import { Button } from '@/components';
import classNames from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';
import classes from './ModalContent.module.css';
import { CloseIcon } from '@/assets/icons';

type ModalContentProps = {
  contentClassName?: string;
};

const ModalContent: FC<PropsWithChildren<ModalContentProps>> = ({
  children,
  contentClassName,
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
        design="ghost"
        onClick={close}
        icon={<CloseIcon color="black" />}
        className={classes.closeButton}
      />
    </div>
  );
};

export { ModalContent };