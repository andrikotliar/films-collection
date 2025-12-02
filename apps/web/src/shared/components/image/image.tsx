import { type ComponentProps, forwardRef } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import { handleImageError } from './helpers';
import { env } from '~/shared';
import { imageNotFoundPlaceholder } from '~/assets';

type Props = {
  src?: string | null;
  errorImageSrc?: string;
  isExternal?: boolean;
  shouldFitContainer?: boolean;
} & Omit<ComponentProps<'img'>, 'onError' | 'src'>;

export const Image = forwardRef<HTMLImageElement, Props>(
  (
    {
      src,
      className,
      isExternal = false,
      errorImageSrc = imageNotFoundPlaceholder,
      shouldFitContainer = false,
      ...props
    },
    ref,
  ) => {
    const getImageSource = () => {
      if ((isExternal && !env.BASE_MEDIA_URL) || !src) {
        return errorImageSrc;
      }

      if (isExternal) {
        return `${env.BASE_MEDIA_URL}/${src}`;
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
