import clsx from 'clsx';
import styles from './drawer.module.css';
import { Button } from '~/shared/components/button/button';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

type Size = 'narrow' | 'wide';
type Position = 'left' | 'right';

type DrawerProps = {
  children: React.ReactNode;
  size?: Size;
  isOpen: boolean;
  position?: Position;
  onClose: VoidFunction;
};

export const Drawer = ({
  children,
  size = 'wide',
  isOpen,
  position = 'right',
  onClose,
}: DrawerProps) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 600);
  };

  return (
    <div
      className={clsx(
        styles.drawer_wrapper,
        styles[size],
        styles[position],
        isClosing && styles.is_closing,
      )}
    >
      {children}
      <div className={styles.close_button_wrapper}>
        <Button variant="ghost" icon={<XIcon />} onClick={handleClose} inheritColor />
      </div>
    </div>
  );
};
