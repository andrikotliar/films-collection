import { images } from '@/assets/images';
import { FC } from 'react';
import styles from './VideoPreview.module.css';
import { Image } from '@/ui/Image/Image';

type VideoPreviewProps = {
  videoId: string;
};

export const VideoPreview: FC<VideoPreviewProps> = ({ videoId }) => {
  if (!videoId.length) {
    return (
      <Image
        src={images.noVideoPreview}
        className={styles.previewPlaceholder}
      />
    );
  }

  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      className={styles.videoPreview}
    />
  );
};
