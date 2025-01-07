import { images } from '@/assets/images';
import { handleImageError } from '@/helpers';
import { FC } from 'react';
import styles from './ImagePreview.module.css';

type ImagePreviewProps = {
  baseUrl: string;
  path: string;
};

export const ImagePreview: FC<ImagePreviewProps> = ({ baseUrl, path }) => {
  if (!path.length) {
    return <img src={images.noImagePreview} className={styles.imagePreview} />;
  }

  return (
    <img
      src={`${baseUrl}/${path}`}
      onError={handleImageError(images.noImagePreview)}
      className={styles.imagePreview}
    />
  );
};
