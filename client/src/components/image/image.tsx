import { ComponentProps, forwardRef } from 'react';
import styles from './image.module.css';
import classNames from 'classnames';
import { handleImageError } from './helpers';
import { images } from '@/assets/images';
import { IMAGES_HOSTING_BASE_URL } from '@/common';

type ImageProps = {
  src?: string | null;
  errorImageSrc?: string;
  isExternal?: boolean;
  shouldFitContainer?: boolean;
} & Omit<ComponentProps<'img'>, 'onError' | 'src'>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      className,
      isExternal = false,
      errorImageSrc = images.noImagePreview,
      shouldFitContainer = false,
      ...props
    },
    ref,
  ) => {
    const getImageSource = () => {
      if ((isExternal && !IMAGES_HOSTING_BASE_URL) || !src) {
        return errorImageSrc;
      }

      if (isExternal) {
        return `${IMAGES_HOSTING_BASE_URL}/${src}`;
      }

      return src;
    };

    return (
      <img
        ref={ref}
        src={getImageSource()}
        className={classNames(styles.image, className, {
          [styles.fitContainer]: shouldFitContainer,
        })}
        onError={handleImageError(errorImageSrc)}
        {...props}
      />
    );
  },
);
