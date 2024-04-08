import { useClickOutside } from '@/hooks';
import {
  FC,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './PopupMenu.module.css';
import { createPortal } from 'react-dom';
import { PropsWithClassName } from '@/common/types';
import classNames from 'classnames';

type Props = PropsWithClassName<{
  isOpen: boolean;
  onClose: VoidFunction;
  triggerRef: RefObject<HTMLButtonElement>;
  menuMargin?: number;
  positionMarker?: 'left' | 'right';
}>;

type Position = {
  left: number;
  top: number;
};

const DEFAULT_MENU_MARGIN_PX = 10;

const PopupMenu: FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  triggerRef,
  children,
  menuMargin = DEFAULT_MENU_MARGIN_PX,
  className,
  positionMarker = 'left',
}) => {
  const [position, setPosition] = useState<Position | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('scroll', onClose);

    return () => {
      document.removeEventListener('scroll', onClose);
    };
  }, []);

  useEffect(() => {
    if (triggerRef.current && menuRef.current) {
      const { width } = menuRef.current.getBoundingClientRect();

      const { left, bottom, right } =
        triggerRef.current.getBoundingClientRect();

      const leftPosition = positionMarker === 'left' ? left : right - width;

      setPosition({ left: leftPosition, top: bottom + menuMargin });
    }
  }, [isOpen, triggerRef, menuRef]);

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: triggerRef,
    containerRef: menuRef,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      className={classNames(styles.popupMenu, className)}
      style={position ?? {}}
    >
      {children}
    </div>,
    document.body,
  );
};

export { PopupMenu };
