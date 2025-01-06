import { ComponentProps, FC } from 'react';
import styles from './Image.module.css';
import classNames from 'classnames';

type ImageProps = ComponentProps<'img'>;

export const Image: FC<ImageProps> = ({ className, ...props }) => {
  return <img className={classNames(styles.image, className)} {...props} />;
};
