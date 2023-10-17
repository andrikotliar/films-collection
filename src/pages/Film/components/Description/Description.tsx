import classes from './Description.module.css';
import { FC } from 'react';
import { DescriptionType, TypeVariants } from '@/common';

type DescriptionProps = {
  type: TypeVariants[];
  description: DescriptionType[];
  activeIndex: number;
};

const Description: FC<DescriptionProps> = ({
  description,
  activeIndex,
}) => {
  return (
    <div className={classes.description}>
      <h2 className={classes.title}>Description</h2>
      <div className={classes.text}>
        {description[activeIndex].plot}
      </div>
      {description[activeIndex].episodesCount && (
        <div className={classes.episodesCount}>
          Episodes number:{' '}
          <b>{description[activeIndex].episodesCount}</b>
        </div>
      )}
    </div>
  );
};

export { Description };
