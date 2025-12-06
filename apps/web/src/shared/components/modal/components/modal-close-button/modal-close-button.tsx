import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import styles from './modal-close-button.module.css';
import type { PropsWithClassName } from '~/shared/types';

type ModalCloseButtonProps = PropsWithClassName<{
  onClick: VoidFunction;
}>;

export const ModalCloseButton = ({ onClick, className }: ModalCloseButtonProps) => {
  return (
    <button onClick={onClick} className={clsx(styles.close_button, className)}>
      <XIcon size={15} />
    </button>
  );
};
