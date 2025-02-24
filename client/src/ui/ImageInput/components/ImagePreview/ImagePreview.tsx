import { images } from '@/assets/images';
import { CSSProperties, FC } from 'react';
import { Image } from '@/ui/Image/Image';
import styles from './ImagePreview.module.css';

export type ImagePreviewProps = {
  path: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  shouldFitImageToContainer?: boolean;
};

export const ImagePreview: FC<ImagePreviewProps> = ({
  path,
  shouldFitImageToContainer,
  width = 'auto',
  height = 'auto',
}) => {
  return (
    <div style={{ width, height }} className={styles.container}>
      <Image
        src={path}
        errorSource={images.noImagePreview}
        isExternal
        shouldFitContainer={shouldFitImageToContainer}
      />
    </div>
  );
};
