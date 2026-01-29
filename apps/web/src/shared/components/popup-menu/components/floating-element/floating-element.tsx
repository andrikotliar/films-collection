import clsx from 'clsx';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './floating-element.module.css';
import { useClickOutside, useCloseOnEscape, useFocusTrap, useResizeObserver } from '~/shared/hooks';

type Position = 'left' | 'right';

type Styles = {
  left: number;
  top: number;
  width?: number;
};

type UpdateMenuPositionProps = {
  menuElement: HTMLDivElement | null;
  triggerElement: HTMLElement | null;
  menuMargin: number;
  position: Position;
  shouldAdjustToTriggerWidth: boolean;
};

export type FloatingElementProps = {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  /**
   * Defines from where calculate position depending on triggerRef
   * @default left
   */
  position?: Position;
  menuMargin?: number;
  /**
   * Avoid scrolling the element with the page
   * @default false
   */
  isFixed?: boolean;
  shouldAdjustToTriggerWidth?: boolean;
  shouldFocusTriggerOnClose?: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const DEFAULT_MENU_MARGIN_PX = 10;

const updateMenuPosition = ({
  menuElement,
  triggerElement,
  menuMargin,
  position,
  shouldAdjustToTriggerWidth,
}: UpdateMenuPositionProps): Styles => {
  if (!menuElement || !triggerElement) {
    return {
      left: 0,
      top: 0,
    };
  }

  const { width, height: menuHeight } = menuElement.getBoundingClientRect();

  const { left, bottom, right, top, width: buttonWidth } = triggerElement.getBoundingClientRect();

  const isOverflowBottom = bottom + menuHeight >= window.innerHeight;
  const isOverflowTop = top - menuHeight <= 0;

  const horizontalPosition = position === 'left' ? left : right - width;
  const verticalPosition =
    isOverflowBottom && !isOverflowTop ? top - menuHeight - menuMargin : bottom + menuMargin;

  return {
    left: horizontalPosition,
    top: verticalPosition + window.scrollY,
    width: shouldAdjustToTriggerWidth ? buttonWidth : undefined,
  };
};

const setPosition = (menuElem: HTMLDivElement | null, styles: Styles) => {
  if (!menuElem) {
    return;
  }

  if (styles.width) {
    menuElem.style.width = styles.width + 'px';
  }

  menuElem.style.top = styles.top + 'px';
  menuElem.style.left = styles.left + 'px';
};

export const FloatingElement = ({
  triggerRef,
  menuMargin = DEFAULT_MENU_MARGIN_PX,
  className,
  position = 'left',
  children,
  isOpen,
  shouldAdjustToTriggerWidth = false,
  shouldFocusTriggerOnClose = false,
  onClose,
  isFixed = false,
  ...divProps
}: FloatingElementProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setPosition(
      menuRef.current,
      updateMenuPosition({
        menuElement: menuRef.current,
        triggerElement: triggerRef.current,
        menuMargin,
        position,
        shouldAdjustToTriggerWidth,
      }),
    );
  }, []);

  useCloseOnEscape(isOpen, onClose);

  useFocusTrap({
    container: menuRef.current,
    trigger: triggerRef.current,
    isOpen,
    shouldFocusOnClose: shouldFocusTriggerOnClose,
  });

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: triggerRef,
    containerRef: menuRef,
  });

  const resizeObserver = useCallback(() => {
    setPosition(
      menuRef.current,
      updateMenuPosition({
        menuElement: menuRef.current,
        triggerElement: triggerRef.current,
        menuMargin,
        position,
        shouldAdjustToTriggerWidth,
      }),
    );
  }, [menuRef, triggerRef]);

  useResizeObserver(resizeObserver, document.body);

  return createPortal(
    <div
      ref={menuRef}
      className={clsx(styles.popup_menu, className, isFixed && styles.fixed_popup_menu)}
      {...divProps}
    >
      {children}
    </div>,
    document.body,
  );
};
