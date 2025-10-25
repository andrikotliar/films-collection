import styles from './styles.module.css';
import clsx from 'clsx';
import { type RefObject, useRef } from 'react';
import { useClickOutside, useCloseOnScroll, mainMenu } from '~/common';
import { Menu } from '~/common/components/menu/menu';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

export const AppMenu = ({ isOpen, onClose, menuButtonRef }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: menuButtonRef,
    containerRef,
  });

  useCloseOnScroll(onClose);

  return (
    <div
      className={clsx(styles.app_menu, {
        [styles.open_app_menu]: isOpen,
      })}
      ref={containerRef}
    >
      <Menu config={mainMenu} isStandalone />
    </div>
  );
};
