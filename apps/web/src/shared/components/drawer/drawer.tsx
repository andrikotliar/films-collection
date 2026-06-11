import clsx from 'clsx';
import styles from './drawer.module.css';
import { XIcon } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BLOCKING_SCROLL_CLASS_NAME } from '~/shared/constants';

type Size = 'narrow' | 'wide';
type Position = 'left' | 'right';

type DrawerProps = {
  children: React.ReactNode;
  size?: Size;
  isOpen: boolean;
  position?: Position;
  onClose: VoidFunction;
};

const setDraggingClass = (element: HTMLDivElement) => {
  element.classList.add(styles.is_dragging);
  element.classList.remove(styles.is_settling);
};

const removeDraggingClass = (element: HTMLDivElement) => {
  element.classList.remove(styles.is_dragging);
  element.classList.add(styles.is_settling);
};

const setClosingClass = (element: HTMLDivElement | null) => {
  if (!element) {
    return;
  }

  element.classList.remove(BLOCKING_SCROLL_CLASS_NAME);
  element.classList.add(styles.is_settling);
  element.classList.add(styles.is_closing);
};

export const Drawer = ({ children, size = 'wide', isOpen, onClose }: DrawerProps) => {
  const drawerWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  useLayoutEffect(() => {
    const drawer = drawerWrapperRef.current;
    if (!drawer) return;

    drawer.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
      drawer.classList.add(styles.is_settling);
      drawer.style.transform = 'translateX(0)';
    });
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setClosingClass(drawerWrapperRef.current);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drawerWrapperRef.current) {
      return;
    }

    setDraggingClass(drawerWrapperRef.current);

    isDragging.current = true;

    dragStartX.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const path = e.nativeEvent.composedPath();

    if (!drawerWrapperRef.current || !path.includes(drawerWrapperRef.current)) {
      return;
    }

    setDraggingClass(drawerWrapperRef.current);

    isDragging.current = true;

    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
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
    const deltaY = e.touches[0].clientY - dragStartY.current;

    if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (deltaX < 0 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    drawerWrapperRef.current.style.transform = `translateX(${deltaX}px)`;
  };

  const handleMouseLeave = () => {
    if (!drawerWrapperRef.current) {
      return;
    }

    removeDraggingClass(drawerWrapperRef.current);

    isDragging.current = false;
    drawerWrapperRef.current.style.transform = '';
  };

  const handleMouseUp = () => {
    if (!drawerWrapperRef.current) {
      return;
    }

    const matrix = new DOMMatrix(getComputedStyle(drawerWrapperRef.current).transform);
    const translateX = matrix.m41;
    removeDraggingClass(drawerWrapperRef.current);

    if (translateX > drawerWrapperRef.current.clientWidth / 2) {
      handleClose();
      return;
    }

    isDragging.current = false;
    drawerWrapperRef.current.style.transform = '';
  };

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
      ref={drawerWrapperRef}
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
