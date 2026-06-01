import clsx from 'clsx';
import styles from './drawer.module.css';
import { XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

type Size = 'narrow' | 'wide';
type Position = 'left' | 'right';

type DrawerProps = {
  children: React.ReactNode;
  size?: Size;
  isOpen: boolean;
  position?: Position;
  onClose: VoidFunction;
};

export const Drawer = ({ children, size = 'wide', isOpen, onClose }: DrawerProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const drawerWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const drawerStartRight = useRef(0);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 600);
  };

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drawerWrapperRef.current) {
      return;
    }

    isDragging.current = true;

    const currentRight = parseInt(getComputedStyle(drawerWrapperRef.current).right, 10);
    dragStartX.current = e.clientX;
    drawerStartRight.current = isNaN(currentRight) ? 0 : currentRight;
  };

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!drawerWrapperRef.current || !isDragging.current) {
      return;
    }

    const deltaX = e.clientX - dragStartX.current;

    if (deltaX <= 0) {
      return;
    }

    drawerWrapperRef.current.style.right = `${drawerStartRight.current - deltaX}px`;
  };

  const handleMouseUp = () => {
    if (!drawerWrapperRef.current) {
      return;
    }

    const currentRight = parseInt(getComputedStyle(drawerWrapperRef.current).right, 10);
    const windowWidth = drawerWrapperRef.current.clientWidth;

    if (windowWidth - Math.abs(currentRight) <= 600) {
      handleClose();
      return;
    }

    isDragging.current = false;
    drawerWrapperRef.current.style.right = '0';
  };

  return (
    <div
      className={clsx(styles.drawer_wrapper, styles[size], isClosing && styles.is_closing)}
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseUp}
      ref={drawerWrapperRef}
    >
      {children}
      <button className={styles.close_button} onClick={handleClose}>
        <XIcon className={styles.close_icon} />
      </button>
    </div>
  );
};
