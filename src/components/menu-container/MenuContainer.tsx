import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './MenuContainer.module.css';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

type MenuContainerProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const MenuContainer: FC<PropsWithChildren<MenuContainerProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.root}>
      <div className={styles.container}>{children}</div>
      <div className={styles.overlay} onClick={onClose} />
    </div>,
    document.body,
  );
};

export { MenuContainer };
