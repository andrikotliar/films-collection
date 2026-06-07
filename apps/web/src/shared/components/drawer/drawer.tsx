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
  textColor?: 'white' | 'black';
};

export const Drawer = ({
  children,
  size = 'wide',
  isOpen,
  onClose,
  textColor = 'black',
}: DrawerProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const drawerWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

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
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!drawerWrapperRef.current) {
      return;
    }

    isDragging.current = true;

    dragStartX.current = e.touches[0].clientX;
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

    drawerWrapperRef.current.style.transform = `translateX(${deltaX}px)`;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!drawerWrapperRef.current || !isDragging.current) {
      return;
    }

    const deltaX = e.touches[0].clientX - dragStartX.current;

    if (deltaX <= 20) {
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

    if (translateX > 20) {
      handleClose();
      return;
    }

    isDragging.current = false;
    drawerWrapperRef.current.style.transform = '';
  };

  return (
    <div
      className={clsx(
        styles.drawer_wrapper,
        styles[size],
        isClosing && styles.is_closing,
        window.innerWidth <= 1080 && 'no-doc-scroll',
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
      ref={drawerWrapperRef}
      style={{ color: textColor }}
    >
      {children}
      <button className={styles.close_button} onClick={handleClose}>
        <XIcon className={styles.close_icon} />
      </button>
    </div>
  );
};
