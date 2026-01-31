import styles from './app-menu.module.css';
import clsx from 'clsx';
import { type RefObject, useRef } from 'react';
import { useClickOutside, mainMenu } from '~/shared';
import { Menu } from '~/shared/components/menu/menu';

type AppMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

export const AppMenu = ({ isOpen, onClose, menuButtonRef }: AppMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: menuButtonRef,
    containerRef,
  });

  return (
    <div
      className={clsx(styles.app_menu, {
        [styles.open_app_menu]: isOpen,
      })}
      ref={containerRef}
    >
      <Menu config={mainMenu} />
    </div>
  );
};
