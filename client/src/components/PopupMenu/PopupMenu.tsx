import {
  useClickOutside,
  useCloseOnEscape,
  useCloseOnScroll,
  useFocusTrap,
} from '@/hooks';
import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './PopupMenu.module.css';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

type PopupMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  triggerRef: RefObject<HTMLElement>;
  menuMargin?: number;
  positionMarker?: 'left' | 'right';
  shouldAdjustToTriggerWidth?: boolean;
  shouldFocusTriggerOnClose?: boolean;
} & HTMLAttributes<HTMLDivElement>;

type Position = {
  left: number;
  top: number;
};

const DEFAULT_MENU_MARGIN_PX = 10;

export const PopupMenu: FC<PropsWithChildren<PopupMenuProps>> = ({
  isOpen,
  onClose,
  triggerRef,
  children,
  menuMargin = DEFAULT_MENU_MARGIN_PX,
  className,
  positionMarker = 'left',
  shouldAdjustToTriggerWidth = false,
  shouldFocusTriggerOnClose = false,
  ...divProps
}) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [menuWidth, setMenuWidth] = useState<number>();
  const menuRef = useRef<HTMLDivElement>(null);

  useCloseOnScroll(onClose);

  const updateMenuPosition = useCallback(
    (menuElement: HTMLDivElement, triggerElement: HTMLElement) => {
      const { width, height: menuHeight } = menuElement.getBoundingClientRect();

      const {
        left,
        bottom,
        right,
        top,
        width: buttonWidth,
      } = triggerElement.getBoundingClientRect();

      const isOverflowBottom = bottom + menuHeight >= window.innerHeight;
      const isOverflowTop = top - menuHeight <= 0;

      const horizontalPosition =
        positionMarker === 'left' ? left : right - width;

      if (isOverflowBottom && !isOverflowTop) {
        setPosition({
          left: horizontalPosition,
          top: top - menuHeight - menuMargin,
        });
      } else {
        setPosition({ left: horizontalPosition, top: bottom + menuMargin });
      }

      if (shouldAdjustToTriggerWidth) {
        setMenuWidth(buttonWidth);
      }
    },
    [positionMarker, shouldAdjustToTriggerWidth, menuMargin],
  );

  useEffect(() => {
    if (isOpen && triggerRef.current && menuRef.current) {
      updateMenuPosition(menuRef.current, triggerRef.current);
    }
  }, [isOpen, triggerRef, menuRef, updateMenuPosition]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (triggerRef.current && menuRef.current) {
        updateMenuPosition(menuRef.current, triggerRef.current);
      }
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [triggerRef, menuRef, updateMenuPosition]);

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: triggerRef,
    containerRef: menuRef,
  });

  useCloseOnEscape(isOpen, onClose);

  useFocusTrap({
    container: menuRef.current,
    trigger: triggerRef.current,
    isOpen,
    shouldFocusOnClose: shouldFocusTriggerOnClose,
  });

  useEffect(() => {
    if (!isOpen && position) {
      setPosition(null);
    }
  }, [position, isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      className={classNames(styles.popupMenu, className)}
      style={{ ...position, width: menuWidth }}
      {...divProps}
    >
      {children}
    </div>,
    document.body,
  );
};
