import clsx from 'clsx';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './floating-element.module.css';
import { useClickOutside, useCloseOnEscape, useFocusTrap, useResizeObserver } from '~/shared/hooks';

type Styles = {
  left: number;
  top: number;
  width?: number;
};

type UpdateMenuPositionProps = {
  menuElement: HTMLDivElement | null;
  triggerElement: HTMLElement | null;
  menuMargin: number;
  shouldAdjustToTriggerWidth: boolean;
  isFixed: boolean;
};

export type FloatingElementProps = {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  /**
   * Defines from where calculate position depending on triggerRef
   * @default left
   */
  /**
   * Top offset from the trigger
   */
  menuMargin?: number;
  /**
   * Define the element position on the page
   * * scroll - the element follow the page scroll
   * * fixed - the element keeps its position on the page
   * @default scroll
   */
  positionState?: 'scroll' | 'fixed';
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
  shouldAdjustToTriggerWidth,
  isFixed,
}: UpdateMenuPositionProps): Styles => {
  if (!menuElement || !triggerElement) {
    return {
      left: 0,
      top: 0,
    };
  }

  const { height: menuHeight } = menuElement.getBoundingClientRect();

  const { left, bottom, top, width: buttonWidth } = triggerElement.getBoundingClientRect();

  const isOverflowBottom = bottom + menuHeight >= window.innerHeight;
  const isOverflowTop = top - menuHeight <= 0;

  const verticalPosition =
    isOverflowBottom && !isOverflowTop ? top - menuHeight - menuMargin : bottom + menuMargin;

  const scrollHight = isFixed ? 0 : window.scrollY;

  return {
    left: left,
    top: verticalPosition + scrollHight,
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
  children,
  isOpen,
  shouldAdjustToTriggerWidth = false,
  shouldFocusTriggerOnClose = false,
  onClose,
  positionState = 'scroll',
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
        shouldAdjustToTriggerWidth,
        isFixed: positionState === 'fixed',
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
        shouldAdjustToTriggerWidth,
        isFixed: positionState === 'fixed',
      }),
    );
  }, [menuRef, triggerRef]);

  useResizeObserver(resizeObserver, document.body);

  return createPortal(
    <div
      ref={menuRef}
      className={clsx(
        styles.popup_menu,
        className,
        positionState === 'fixed' && styles.fixed_popup_menu,
      )}
      {...divProps}
    >
      {children}
    </div>,
    document.body,
  );
};
