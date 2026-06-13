import clsx from 'clsx';
import styles from './drawer.module.css';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { BLOCKING_SCROLL_CLASS_NAME } from '~/shared/constants';
import { useDrawer } from '~/shared/hooks';

type Size = 'narrow' | 'wide';
type Position = 'left' | 'right';

type DrawerProps = {
  children: React.ReactNode;
  size?: Size;
  isOpen: boolean;
  position?: Position;
  onClose: VoidFunction;
  textColor?: 'white' | 'black';
};

export const Drawer = ({ children, size = 'wide', isOpen, onClose }: DrawerProps) => {
  const {
    drawerRef,
    handleClose,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
  } = useDrawer(onClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={clsx(styles.drawer_wrapper, styles[size], BLOCKING_SCROLL_CLASS_NAME)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
      ref={drawerRef}
    >
      <div className={styles.close_button_holder}>
        <button className={styles.close_button} onClick={handleClose}>
          <XIcon />
        </button>
      </div>
      {children}
    </div>,
    document.body,
  );
};
