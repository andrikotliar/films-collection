import { ComponentProps, FC } from 'react';
import styles from './Image.module.css';
import classNames from 'classnames';
import { handleImageError } from './helpers';
import { images } from '@/assets/images';
import { env } from '@/configs';

type ImageProps = {
  src?: string | null;
  errorSource?: string;
  isExternal?: boolean;
  shouldFitContainer?: boolean;
} & Omit<ComponentProps<'img'>, 'onError' | 'src'>;

export const Image: FC<ImageProps> = ({
  src,
  className,
  isExternal = false,
  errorSource = images.characterNotFound,
  shouldFitContainer = false,
  ...props
}) => {
  const getImageSource = () => {
    if ((isExternal && !env.baseMediaUrl) || !src) {
      return errorSource;
    }

    if (isExternal) {
      return `${env.baseMediaUrl}/${src}`;
    }

    return src;
  };

  return (
    <img
      src={getImageSource()}
      className={classNames(styles.image, className, {
        [styles.fitContainer]: shouldFitContainer,
      })}
      onError={handleImageError(errorSource)}
      {...props}
    />
  );
};
