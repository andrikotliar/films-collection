import styles from './styles.module.css';
import { Image } from '~/common/components/image/image';
import { replaceUrlId, EMBEDDED_YOUTUBE_VIDEO_URL, YOUTUBE_VIDEO_DIRECT_URL } from '~/common';
import { PlayIcon } from 'lucide-react';
import { videoNotFoundPlaceholder } from '~/assets';

type Props = {
  videoId: string;
};

export const VideoPreview = ({ videoId }: Props) => {
  if (!videoId.length) {
    return (
      <div className={styles.preview_wrapper}>
        <Image src={videoNotFoundPlaceholder} />
      </div>
    );
  }

  const imageSrc = replaceUrlId(EMBEDDED_YOUTUBE_VIDEO_URL, videoId);
  const videoUrl = replaceUrlId(YOUTUBE_VIDEO_DIRECT_URL, videoId);

  return (
    <a className={styles.preview_wrapper} href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Image src={imageSrc} />
      <PlayIcon className={styles.play_icon} />
    </a>
  );
};
