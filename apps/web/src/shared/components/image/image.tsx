import styles from './image.module.css';
import clsx from 'clsx';
import { handleImageError } from './helpers';
import { imageNotFoundPlaceholder } from '~/assets';

type ImageProps = {
  src?: string | null;
  errorImageSrc?: string;
  shouldFitContainer?: boolean;
  ref?: React.RefObject<HTMLImageElement | null>;
} & Omit<React.ComponentProps<'img'>, 'onError' | 'src'>;

export const Image = ({
  src,
  className,
  errorImageSrc = imageNotFoundPlaceholder,
  shouldFitContainer = false,
  ref,
  ...props
}: ImageProps) => {
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
};
