import { Menu } from '@/components/menu/Menu';
import { mainMenu } from '@/configs';
import styles from './AppMenu.module.css';
import classNames from 'classnames';
import { FC, RefObject, useRef } from 'react';
import { useClickOutside, useCloseOnScroll } from '@/hooks';

type AppMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

const AppMenu: FC<AppMenuProps> = ({ isOpen, onClose, menuButtonRef }) => {
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
      className={classNames(styles.appMenu, {
        [styles.openAppMenu]: isOpen,
      })}
      ref={containerRef}
    >
      <Menu config={mainMenu} />
    </div>
  );
};

export { AppMenu };
