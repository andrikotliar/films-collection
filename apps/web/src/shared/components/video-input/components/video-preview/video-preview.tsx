import styles from './video-preview.module.css';
import { Image } from '~/shared/components/image/image';
import { PlayIcon } from 'lucide-react';

type VideoPreviewProps = {
  imageUrl: string;
  videoUrl: string;
};

export const VideoPreview = ({ imageUrl, videoUrl }: VideoPreviewProps) => {
  if (!videoUrl.length) {
    return (
      <div className={styles.preview_wrapper}>
        <Image src="/placeholder/video-not-found-placeholder_v2.webp" />
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
