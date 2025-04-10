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
    <div>
      <Image
        src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
        className={styles.videoPreview}
      />
    </div>
  );
};
