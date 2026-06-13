import { useLayoutEffect, useRef } from 'react';
import { BLOCKING_SCROLL_CLASS_NAME } from '~/shared/constants';

const DRAGGING_CLASS_NAME = 'is-dragging';
const SETTLING_CLASS_NAME = 'is-settling';
const CLOSING_CLASS_NAME = 'is-closing';

const setDraggingClass = (element: HTMLDivElement) => {
  element.classList.add(DRAGGING_CLASS_NAME);
  element.classList.remove(SETTLING_CLASS_NAME);
};

const removeDraggingClass = (element: HTMLDivElement) => {
  element.classList.remove(DRAGGING_CLASS_NAME);
  element.classList.add(SETTLING_CLASS_NAME);
};

const setClosingClass = (element: HTMLDivElement | null) => {
  if (!element) {
    return;
  }

  element.classList.remove(BLOCKING_SCROLL_CLASS_NAME);
  element.classList.add(SETTLING_CLASS_NAME);
  element.classList.add(CLOSING_CLASS_NAME);
};

export const useDrawer = (onClose: VoidFunction) => {
  const drawerWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  useLayoutEffect(() => {
    const drawer = drawerWrapperRef.current;
    if (!drawer) return;

    drawer.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
      drawer.classList.add(SETTLING_CLASS_NAME);
      drawer.style.transform = 'translateX(0)';
    });
  }, []);

  const handleClose = () => {
    setClosingClass(drawerWrapperRef.current);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const startDragging = (x: number, y: number) => {
    if (!drawerWrapperRef.current) {
      return;
    }
    setDraggingClass(drawerWrapperRef.current);

    isDragging.current = true;

    dragStartX.current = x;
    dragStartY.current = y;
  };

  const handleMove = (x: number, y: number) => {
    if (!drawerWrapperRef.current || !isDragging.current) {
      return;
    }

    const deltaX = x - dragStartX.current;
    const deltaY = y - dragStartY.current;

    if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (deltaX < 0 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    drawerWrapperRef.current.style.transform = `translateX(${deltaX}px)`;
  };

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startDragging(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const path = e.nativeEvent.composedPath();

    if (!drawerWrapperRef.current || !path.includes(drawerWrapperRef.current)) {
      return;
    }

    startDragging(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
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

  return {
    drawerRef: drawerWrapperRef,
    handleClose,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
  };
};
