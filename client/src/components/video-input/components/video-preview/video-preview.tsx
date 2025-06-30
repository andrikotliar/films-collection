import { images } from '@/assets/images';
import styles from './video-preview.module.css';
import { Image } from '@/components/image/image';
import { replaceUrlId } from '@/helpers';
import {
  EMBEDDED_YOUTUBE_VIDEO_URL,
  YOUTUBE_VIDEO_DIRECT_URL,
} from '@/constants';
import { PlayIcon } from 'lucide-react';

type VideoPreviewProps = {
  videoId: string;
};

export const VideoPreview = ({ videoId }: VideoPreviewProps) => {
  if (!videoId.length) {
    return (
      <div className={styles.previewWrapper}>
        <Image src={images.noVideoPreview} />
      </div>
    );
  }

  const imageSrc = replaceUrlId(EMBEDDED_YOUTUBE_VIDEO_URL, videoId);
  const videoUrl = replaceUrlId(YOUTUBE_VIDEO_DIRECT_URL, videoId);

  return (
    <a
      className={styles.previewWrapper}
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={imageSrc} />
      <PlayIcon className={styles.playIcon} />
    </a>
  );
};
