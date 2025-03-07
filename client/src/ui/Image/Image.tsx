import { ComponentProps, forwardRef } from 'react';
import styles from './Image.module.css';
import classNames from 'classnames';
import { handleImageError } from './helpers';
import { images } from '@/assets/images';
import { env } from '@/configs';

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
      errorImageSrc = images.characterNotFound,
      shouldFitContainer = false,
      ...props
    },
    ref,
  ) => {
    const getImageSource = () => {
      if ((isExternal && !env.baseMediaUrl) || !src) {
        return errorImageSrc;
      }

      if (isExternal) {
        return `${env.baseMediaUrl}/${src}`;
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
