import classNames from 'classnames';
import { XIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './ModalCloseButton.module.css';
import { PropsWithClassName } from '@/types';

type ModalCloseButtonProps = {
  onClick: VoidFunction;
};

export const ModalCloseButton: FC<
  PropsWithClassName<ModalCloseButtonProps>
> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.closeButton, className)}
    >
      <XIcon size={15} />
    </button>
  );
};
