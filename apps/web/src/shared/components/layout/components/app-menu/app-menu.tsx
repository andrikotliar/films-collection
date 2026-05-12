import styles from './app-menu.module.css';
import clsx from 'clsx';
import { useRef } from 'react';
import { useClickOutside, useCloseOnScroll } from '~/shared/hooks';
import { Menu } from '~/shared/components/menu/menu';
import { mainMenuConfig } from '~/shared/configs';

type AppMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  menuButtonRef: React.RefObject<HTMLButtonElement>;
};

export const AppMenu = ({ isOpen, onClose, menuButtonRef }: AppMenuProps) => {
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
      <Menu config={mainMenuConfig} isStandalone />
    </div>
  );
};
