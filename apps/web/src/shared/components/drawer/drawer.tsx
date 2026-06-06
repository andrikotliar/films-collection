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
  const dragStartY = useRef(0);

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

    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!drawerWrapperRef.current || !isDragging.current) {
      return;
    }

    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    if (deltaX <= 0 || Math.abs(deltaY) > 10) {
      return;
    }

    drawerWrapperRef.current.style.transform = `translateX(${deltaX}px)`;
  };

  const handleMouseUp = () => {
    if (!drawerWrapperRef.current) {
      return;
    }

    const matrix = new DOMMatrix(getComputedStyle(drawerWrapperRef.current).transform);
    const translateX = matrix.m41;

    isDragging.current = false;
    drawerWrapperRef.current.style.transform = '';

    if (translateX > 200) {
      handleClose();
    }
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
