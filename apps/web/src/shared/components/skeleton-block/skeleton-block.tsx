import { defineCssProperties } from '~/shared/helpers';
import styles from './skeleton-block.module.css';

type SkeletonBlockProps = {
  width: string;
  height: string;
};

export const SkeletonBlock = ({ width, height }: SkeletonBlockProps) => {
  return (
    <div
      className={styles.skeleton}
      style={defineCssProperties({
        '--skeleton-block-width': width,
        '--skeleton-block-height': height,
      })}
    />
  );
};
