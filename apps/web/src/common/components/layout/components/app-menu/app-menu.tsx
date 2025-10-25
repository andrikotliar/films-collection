import { Menu } from '~/common/components/menu/menu';
import { mainMenu } from '~/common';
import styles from './styles.module.css';
import classNames from 'classnames';
import { type RefObject, useRef } from 'react';
import { useClickOutside, useCloseOnScroll } from '~/hooks';

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

  useCloseOnScroll(onClose);

  return (
    <div
      className={classNames(styles.appMenu, {
        [styles.openAppMenu]: isOpen,
      })}
      ref={containerRef}
    >
      <Menu config={mainMenu} isStandalone />
    </div>
  );
};
