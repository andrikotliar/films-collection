import { FC, PropsWithChildren } from 'react';
import { Image } from '@/components';
import styles from './PreviewButton.module.css';
import { PlayIcon } from 'lucide-react';
import classNames from 'classnames';

type PreviewProps = {
  onClick: VoidFunction;
  trailer: string;
  isActive?: boolean;
};

export const PreviewButton: FC<PropsWithChildren<PreviewProps>> = ({
  onClick,
  children,
  trailer,
  isActive = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.previewButton, {
        [styles.activePreviewButton]: isActive,
      })}
      disabled={isActive}
    >
      <div className={styles.previewButtonLabel}>{children}</div>
      <Image
        src={`https://img.youtube.com/vi/${trailer}/hqdefault.jpg`}
        className={styles.previewButtonImage}
      />
      <PlayIcon className={styles.previewButtonIcon} />
    </button>
  );
};
