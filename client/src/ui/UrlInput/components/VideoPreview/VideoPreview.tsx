import { images } from '@/assets/images';
import { FC } from 'react';
import styles from './VideoPreview.module.css';

type VideoPreviewProps = {
  baseUrl: string;
  videoId: string;
};

export const VideoPreview: FC<VideoPreviewProps> = ({ baseUrl, videoId }) => {
  if (!videoId.length) {
    return (
      <img src={images.noVideoPreview} className={styles.previewPlaceholder} />
    );
  }

  return (
    <iframe src={`${baseUrl}/${videoId}`} className={styles.videoPreview} />
  );
};
