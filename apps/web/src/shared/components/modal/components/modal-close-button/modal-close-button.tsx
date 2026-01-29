import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import styles from './modal-close-button.module.css';

type ModalCloseButtonProps = {
  className?: string;
  onClick: VoidFunction;
};

export const ModalCloseButton = ({ onClick, className }: ModalCloseButtonProps) => {
  return (
    <button onClick={onClick} className={clsx(styles.close_button, className)}>
      <XIcon size={15} />
    </button>
  );
};
