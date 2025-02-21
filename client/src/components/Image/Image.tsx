import { ComponentProps, FC } from 'react';
import styles from './Image.module.css';
import classNames from 'classnames';
import { handleImageError } from './helpers';
import { images } from '@/assets/images';
import { env } from '@/configs';

type ImageProps = {
  src?: string | null;
  errorSource?: string;
  external?: boolean;
} & Omit<ComponentProps<'img'>, 'onError' | 'src'>;

export const Image: FC<ImageProps> = ({
  src,
  className,
  external = false,
  errorSource = images.characterNotFound,
  ...props
}) => {
  const getImageSource = () => {
    if ((external && !env.baseMediaUrl) || !src) {
      return errorSource;
    }

    if (external) {
      return `${env.baseMediaUrl}/${src}`;
    }

    return src;
  };

  return (
    <img
      src={getImageSource()}
      className={classNames(styles.image, className)}
      onError={handleImageError(errorSource)}
      {...props}
    />
  );
};
