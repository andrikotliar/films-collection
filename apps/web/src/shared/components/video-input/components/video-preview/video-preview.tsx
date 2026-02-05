import styles from './video-preview.module.css';
import { Image } from '~/shared/components/image/image';
import { PlayIcon } from 'lucide-react';
import { videoNotFoundPlaceholder } from '~/assets';

type VideoPreviewProps = {
  imageUrl: string;
  videoUrl: string;
};

export const VideoPreview = ({ imageUrl, videoUrl }: VideoPreviewProps) => {
  if (!videoUrl.length) {
    return (
      <div className={styles.preview_wrapper}>
        <Image src={videoNotFoundPlaceholder} />
      </div>
    );
  }

  return (
    <a className={styles.preview_wrapper} href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Image src={imageUrl} />
      <PlayIcon className={styles.play_icon} />
    </a>
  );
};
