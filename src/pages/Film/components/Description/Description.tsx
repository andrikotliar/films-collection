import classes from './Description.module.css';
import { FC, useState } from 'react';
import { DescriptionType, TypeVariants } from '@/common';
import {
  EpisodesList,
  ExpandButton,
} from '@/pages/Film/components/Description/components';

type DescriptionProps = {
  type: TypeVariants[];
  description: DescriptionType[];
  activeIndex: number;
};

const Description: FC<DescriptionProps> = ({
  type,
  description,
  activeIndex,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={classes.description}>
      <h2 className={classes.title}>Description</h2>
      <div className={classes.content}>
        <div className={classes.text}>
          {description[activeIndex].plot}
        </div>
        {type.includes('Series') && (
          <>
            <ExpandButton
              isExpanded={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
              episodesCount={
                description[activeIndex].episodes.length
              }
            />
            {isExpanded && (
              <EpisodesList
                episodes={description[activeIndex].episodes}
                className={classes.episodes}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { Description };
