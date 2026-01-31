import { type ComponentProps, forwardRef } from 'react';
import styles from './image.module.css';
import clsx from 'clsx';
import { handleImageError } from './helpers';
import { imageNotFoundPlaceholder } from '~/assets';

type ImageProps = {
  src?: string | null;
  errorImageSrc?: string;
  shouldFitContainer?: boolean;
} & Omit<ComponentProps<'img'>, 'onError' | 'src'>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      className,
      errorImageSrc = imageNotFoundPlaceholder,
      shouldFitContainer = false,
      ...props
    },
    ref,
  ) => {
    const getImageSource = () => {
      if (!src) {
        return errorImageSrc;
      }

      return src;
    };

    return (
      <img
        ref={ref}
        src={getImageSource()}
        className={clsx(styles.image, className, {
          [styles.fit_container]: shouldFitContainer,
        })}
        onError={handleImageError(errorImageSrc)}
        {...props}
      />
    );
  },
);
