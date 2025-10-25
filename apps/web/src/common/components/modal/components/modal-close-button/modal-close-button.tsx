import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import styles from './styles.module.css';
import type { PropsWithClassName } from '~/common/types';

type Props = PropsWithClassName<{
  onClick: VoidFunction;
}>;

export const ModalCloseButton = ({ onClick, className }: Props) => {
  return (
    <button onClick={onClick} className={clsx(styles.close_button, className)}>
      <XIcon size={15} />
    </button>
  );
};
